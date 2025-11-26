import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user || null);
    });
  }, []);

  // While loading, show nothing (or a loader)
  if (user === undefined) return null;

  // Redirect if not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Render children if logged in
  return children;
}
