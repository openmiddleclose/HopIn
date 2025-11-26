// src/components/AuthRoute.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../hooks/useSupabase";
import { Navigate } from "react-router-dom";
import { Spinner, Box } from "@chakra-ui/react";

export default function AuthRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(supabase.auth.user());
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" />
      </Box>
    );

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
