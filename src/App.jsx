// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SupportChat from "./components/SupportChat.jsx";
import { supabase } from "./hooks/useSupabase.js";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import AutoTranslator from "./contexts/AutoTranslator.jsx"; // <-- new wrapper

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
import PassengerGuidelines from "./pages/PassengerGuidelines.jsx";

// -------- Protected User Route --------
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

  if (!userProfile.onboarding_complete) {
    if (!userProfile.profile_picture) return <Navigate to="/onboarding-profile-picture" />;
    if (!userProfile.profile_description) return <Navigate to="/onboarding-profile-description" />;
    if (!userProfile.community_agreement) return <Navigate to="/onboarding-agreement" />;
    return <Navigate to="/onboarding" />;
  }

  if (!userProfile.is_driver_verified) return <Navigate to="/onboarding/driver-license" />;

  if (userProfile.is_admin) return <Navigate to="/admin-dashboard" />;

  return children;
}

// -------- Protected Admin Route --------
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

// -------- Main App --------
export default function App() {
  return (
    <LanguageProvider>
      <AutoTranslator>
        {/* Navbar always visible */}
        <Navbar />

        {/* App Routes */}
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Onboarding */}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding-profile-picture" element={<OnboardingProfilePicture />} />
          <Route path="/onboarding-profile-description" element={<OnboardingProfileDescription />} />
          <Route path="/onboarding-agreement" element={<OnboardingCommunityAgreement />} />
          <Route path="/onboarding/driver-license" element={<OnboardingDriverLicense />} />

          {/* Protected User */}
          <Route
            path="/dashboard"
            element={<ProtectedUserRoute><Dashboard /></ProtectedUserRoute>}
          />

          {/* Protected Admin */}
          <Route
            path="/admin-dashboard"
            element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>}
          />

          {/* Trips */}
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/search-trips" element={<SearchTrips />} />
          <Route path="/trip/:id" element={<TripDetail />} />

          {/* Other Pages */}
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/passengers" element={<Passengers />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:universityName" element={<UniversityPage />} />
          <Route path="/trust-and-safety" element={<TrustSafety />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/legal-compliant" element={<LegalCompliant />} />
          <Route path="/passenger-guidelines" element={<PassengerGuidelines />} />

          {/* Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/driver-cancellation" element={<DriverCancellationPolicy />} />
        </Routes>

        {/* Footer */}
        <Footer />

        {/* Floating support chat */}
        <SupportChat tripId={null} />
      </AutoTranslator>
    </LanguageProvider>
  );
}
