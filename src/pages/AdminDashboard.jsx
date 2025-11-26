// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Spinner,
  Input,
  Card,
  CardBody,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "../hooks/useSupabase.js";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyInputs, setReplyInputs] = useState({});
  const toast = useToast();

  // Request browser notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Fetch support tickets
  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTickets(data);
  };

  // Fetch user reports
  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setReports(data);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchTickets();
      await fetchReports();
      setLoading(false);
    };
    init();

    // -------------------------
    // REAL-TIME SUBSCRIPTIONS
    // -------------------------

    // ⬅️ Support Ticket Created
    const ticketInsertSub = supabase
      .channel("ticket-insert")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "support_tickets" },
        (payload) => {
          setTickets((prev) => [payload.new, ...prev]);
          toast({
            title: "New Support Ticket",
            description: `From user ${payload.new.user_id}`,
            status: "info",
          });
        }
      )
      .subscribe();

    // ⬅️ Ticket Updated (requires admin)
    const ticketUpdateSub = supabase
      .channel("ticket-update")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "support_tickets" },
        (payload) => {
          setTickets((prev) =>
            prev.map((t) => (t.id === payload.new.id ? payload.new : t))
          );

          if (payload.new.needs_admin) {
            toast({
              title: "Ticket Requires Admin",
              description: `Ticket #${payload.new.id}`,
              status: "warning",
            });
          }
        }
      )
      .subscribe();

    // ⬅️ Report Created (LIVE)
    const reportInsertSub = supabase
      .channel("report-insert")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reports" },
        (payload) => {
          setReports((prev) => [payload.new, ...prev]);
          toast({
            title: "New User Report",
            description: `User ${payload.new.reporter_id} reported ${payload.new.reported_id}`,
            status: "error",
          });
        }
      )
      .subscribe();

    // ⬅️ Report Updated (resolved/escalated)
    const reportUpdateSub = supabase
      .channel("report-update")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "reports" },
        (payload) => {
          setReports((prev) =>
            prev.map((r) => (r.id === payload.new.id ? payload.new : r))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ticketInsertSub);
      supabase.removeChannel(ticketUpdateSub);
      supabase.removeChannel(reportInsertSub);
      supabase.removeChannel(reportUpdateSub);
    };
  }, []);

  // Update ticket or report
  const updateItem = async (table, id, updates) => {
    const { error } = await supabase.from(table).update(updates).eq("id", id);

    if (error) {
      toast({ title: `Error updating ${table}`, status: "error" });
      return;
    }

    toast({
      title: `${table === "support_tickets" ? "Ticket" : "Report"} updated`,
      status: "success",
    });

    setReplyInputs((prev) => ({ ...prev, [id]: "" }));
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6} color="white" maxW="1200px" mx="auto">
      <Heading mb={6}>Admin Dashboard</Heading>

      {/* Support Tickets */}
      <Heading size="lg" mb={4}>
        Support Tickets
      </Heading>

      <VStack spacing={4} align="stretch" mb={10}>
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            bg={ticket.needs_admin ? "red.800" : "gray.800"}
            borderWidth={ticket.priority === "high" ? 2 : 1}
            borderColor={
              ticket.priority === "high"
                ? "red.400"
                : ticket.priority === "medium"
                ? "yellow.400"
                : "gray.600"
            }
          >
            <CardBody>
              <HStack justify="space-between">
                <Text>
                  <strong>User:</strong> {ticket.user_id}
                </Text>
                <Badge
                  colorScheme={
                    ticket.priority === "high"
                      ? "red"
                      : ticket.priority === "medium"
                      ? "yellow"
                      : "green"
                  }
                >
                  {ticket.priority ? ticket.priority.toUpperCase() : "LOW"}
                </Badge>
              </HStack>

              <Text mt={2}>
                <strong>Status:</strong> {ticket.status || "OPEN"}
              </Text>
              <Text mt={2}>
                <strong>AI Response:</strong> {ticket.ai_reply || "Pending"}
              </Text>
              <Text mt={2}>
                <strong>Message:</strong> {ticket.message}
              </Text>

              {ticket.admin_reply && (
                <Text mt={2} color="teal.300">
                  <strong>Admin Reply:</strong> {ticket.admin_reply}
                </Text>
              )}

              {/* Reply Box */}
              <HStack mt={3}>
                <Input
                  placeholder="Write a reply..."
                  value={replyInputs[ticket.id] || ""}
                  onChange={(e) =>
                    setReplyInputs((prev) => ({
                      ...prev,
                      [ticket.id]: e.target.value,
                    }))
                  }
                />
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={() =>
                    updateItem("support_tickets", ticket.id, {
                      admin_reply: replyInputs[ticket.id] || "",
                      needs_admin: false,
                    })
                  }
                >
                  Reply
                </Button>
              </HStack>

              <HStack mt={3} spacing={3}>
                <Button
                  size="sm"
                  colorScheme="orange"
                  onClick={() =>
                    updateItem("support_tickets", ticket.id, {
                      status: "Escalated",
                    })
                  }
                >
                  Escalate
                </Button>

                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() =>
                    updateItem("support_tickets", ticket.id, {
                      status: "Resolved",
                    })
                  }
                >
                  Resolve
                </Button>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </VStack>

      {/* User Reports */}
      <Heading size="lg" mb={4}>
        User Reports
      </Heading>

      <VStack spacing={4} align="stretch">
        {reports.map((report) => (
          <Card key={report.id} bg="gray.700">
            <CardBody>
              <Text>
                <strong>Reporter:</strong> {report.reporter_id}
              </Text>
              <Text>
                <strong>Reported User:</strong> {report.reported_id}
              </Text>

              {report.trip_id && (
                <Text>
                  <strong>Trip ID:</strong> {report.trip_id}
                </Text>
              )}

              <Text mt={2}>
                <strong>Reason:</strong> {report.reason}
              </Text>

              <Text mt={2}>
                <strong>Created:</strong>{" "}
                {new Date(report.created_at).toLocaleString()}
              </Text>

              <HStack mt={3} spacing={3}>
                <Button
                  size="sm"
                  colorScheme="orange"
                  onClick={() =>
                    updateItem("reports", report.id, {
                      resolved: false,
                      escalated: true,
                    })
                  }
                >
                  Escalate
                </Button>

                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() =>
                    updateItem("reports", report.id, { resolved: true })
                  }
                >
                  Resolve
                </Button>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
}
