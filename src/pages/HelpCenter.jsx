// src/pages/HelpCenter.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../hooks/useSupabase";

export default function HelpCenter() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    };
    checkUser();
  }, []);

  if (user === undefined) return <div>Loading...</div>;

  // If not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Help Center</h1>
      <p>How can we help you today?</p>
    </div>
  );
}
