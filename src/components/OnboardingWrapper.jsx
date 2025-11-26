// src/components/OnboardingWrapper.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../hooks/useSupabase.js";

export default function OnboardingWrapper({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select(
          "is_admin, email_confirmed, onboarding_complete, profile_picture, profile_description, community_agreement, is_driver_verified"
        )
        .eq("id", user.id)
        .single();

      setUserProfile(profile);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userProfile) return <Navigate to="/login" />;
  if (!userProfile.email_confirmed) return <Navigate to="/verify-email" />;

  // Onboarding steps
  if (!userProfile.onboarding_complete) {
    if (!userProfile.profile_picture) return <Navigate to="/onboarding-profile-picture" />;
    if (!userProfile.profile_description) return <Navigate to="/onboarding-profile-description" />;
    if (!userProfile.community_agreement) return <Navigate to="/onboarding-agreement" />;
    return <Navigate to="/onboarding" />;
  }

  // Driver license verification
  if (!userProfile.is_driver_verified) return <Navigate to="/onboarding/driver-license" />;

  // Admin redirect
  if (userProfile.is_admin) return <Navigate to="/admin-dashboard" />;

  // User is fully onboarded & verified
  return children;
}
