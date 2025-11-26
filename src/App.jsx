// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import SupportChat from "./components/SupportChat.jsx";
import { supabase } from "./hooks/useSupabase.js";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import OnboardingProfilePicture from "./pages/OnboardingProfilePicture.jsx";
import OnboardingProfileDescription from "./pages/OnboardingProfileDescription.jsx";
import OnboardingCommunityAgreement from "./pages/OnboardingCommunityAgreement.jsx";
import OnboardingDriverLicense from "./pages/OnboardingDriverLicense.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";
import SearchTrips from "./pages/SearchTrips.jsx";
import TripDetail from "./pages/TripDetail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Passengers from "./pages/Passengers.jsx";
import Students from "./pages/Students.jsx";
import Drivers from "./pages/Drivers.jsx";
import TrustSafety from "./pages/TrustAndSafety.jsx";
import Sustainability from "./pages/Sustainability.jsx";
import UniversityPage from "./pages/UniversityPage.jsx";
import LegalCompliant from "./pages/LegalCompliant.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import DriverCancellationPolicy from "./pages/DriverCancellationPolicy.jsx";

// ⭐ NEW PAGE
import PassengerGuidelines from "./pages/PassengerGuidelines.jsx";

// -------- Protected route for normal users --------
function ProtectedUserRoute({ children }) {
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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

  // Onboarding flow
  if (!userProfile.onboarding_complete) {
    if (!userProfile.profile_picture) return <Navigate to="/onboarding-profile-picture" />;
    if (!userProfile.profile_description) return <Navigate to="/onboarding-profile-description" />;
    if (!userProfile.community_agreement) return <Navigate to="/onboarding-agreement" />;
    return <Navigate to="/onboarding" />;
  }

  // Driver license verification check
  if (!userProfile.is_driver_verified) return <Navigate to="/onboarding/driver-license" />;

  // Admin redirect
  if (userProfile.is_admin) return <Navigate to="/admin-dashboard" />;

  return children;
}

// -------- Protected route for admins --------
function ProtectedAdminRoute({ children }) {
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin, email_confirmed")
        .eq("id", user.id)
        .single();

      setUserProfile(profile);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userProfile || !userProfile.is_admin) return <Navigate to="/login" />;
  if (!userProfile.email_confirmed) return <Navigate to="/verify-email" />;

  return children;
}

// -------- App component --------
export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Onboarding flow */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/onboarding-profile-picture" element={<OnboardingProfilePicture />} />
        <Route path="/onboarding-profile-description" element={<OnboardingProfileDescription />} />
        <Route path="/onboarding-agreement" element={<OnboardingCommunityAgreement />} />
        <Route path="/onboarding/driver-license" element={<OnboardingDriverLicense />} />

        {/* Protected user dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedUserRoute>
              <Dashboard />
            </ProtectedUserRoute>
          }
        />

        {/* Protected admin dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        {/* Trip routes */}
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/search-trips" element={<SearchTrips />} />
        <Route path="/trip/:id" element={<TripDetail />} />

        {/* Other pages */}
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/passengers" element={<Passengers />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:universityName" element={<UniversityPage />} />
        <Route path="/trust-and-safety" element={<TrustSafety />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/legal-compliant" element={<LegalCompliant />} />

        {/* ⭐ NEW ROUTE: Passenger Guidelines */}
        <Route path="/passenger-guidelines" element={<PassengerGuidelines />} />

        {/* Legal / Privacy */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/driver-cancellation" element={<DriverCancellationPolicy />} />
      </Routes>

      {/* Floating Support Chat */}
      <SupportChat tripId={null} />
    </>
  );
}
