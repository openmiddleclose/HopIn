import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Select } from "@chakra-ui/react";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const { data, error } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false });
    if (error) console.error(error);
    else setTickets(data);
  };

  const updateStatus = async (ticketId, status) => {
    const { error } = await supabase
      .from("support_tickets")
      .update({ status, updated_at: new Date() })
      .eq("id", ticketId);
    if (error) console.error(error);
    else fetchTickets();
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Ticket ID</Th>
          <Th>User</Th>
          <Th>Type</Th>
          <Th>Message</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tickets.map((t) => (
          <Tr key={t.id}>
            <Td>{t.id}</Td>
            <Td>{t.user_id}</Td>
            <Td>{t.type}</Td>
            <Td>{t.message}</Td>
            <Td>{t.status}</Td>
            <Td>
              <Select
                placeholder="Change status"
                onChange={(e) => updateStatus(t.id, e.target.value)}
                size="sm"
              >
                <option value="open">Open</option>
                <option value="escalated">Escalated</option>
                <option value="resolved">Resolved</option>
              </Select>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
