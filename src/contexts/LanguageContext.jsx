// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

/**
 * TRANSLATION DICTIONARY
 * - You can add more at any time.
 * - Used for automatic full-page translation.
 */
const dictionary = {
  en: {
    // Common
    "Legal": "Légal",
    "Privacy Policy": "Politique de confidentialité",
    "Terms of Service": "Conditions d'utilisation",
    "Help Center": "Centre d'aide",

    "Home": "Accueil",
    "Log in": "Se connecter",
    "Sign up": "S'inscrire",
    "Drivers": "Chauffeurs",
    "Passengers": "Passagers",
    "For Students": "Pour Étudiants",
    "Trips": "Trajets",
    "Trust & Safety": "Confiance & Sécurité",
    "Sustainability": "Durabilité",

    // Buttons
    "Continue": "Continuer",
    "Submit": "Soumettre",
    "Cancel": "Annuler",
  },

  fr: {
    // French → English reverse dictionary
    "Légal": "Legal",
    "Politique de confidentialité": "Privacy Policy",
    "Conditions d'utilisation": "Terms of Service",
    "Centre d'aide": "Help Center",

    "Accueil": "Home",
    "Se connecter": "Log in",
    "S'inscrire": "Sign up",
    "Chauffeurs": "Drivers",
    "Passagers": "Passengers",
    "Pour Étudiants": "For Students",
    "Trajets": "Trips",
    "Confiance & Sécurité": "Trust & Safety",
    "Durabilité": "Sustainability",

    "Continuer": "Continue",
    "Soumettre": "Submit",
    "Annuler": "Cancel",
  },
};

/**
 * AUTO TRANSLATE HELPER
 */
export function translate(text, language) {
  if (!text) return text;

  if (language === "fr") {
    return dictionary.en[text] || text;
  }

  if (language === "en") {
    return dictionary.fr[text] || text;
  }

  return text;
}

/**
 * PROVIDER — Holds language state & translation keys
 */
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  // Optional structured text object (Navbar, footer, etc.)
  const texts = {
    en: {
      brand: "HopIn",
      signup: "Sign up",
      login: "Log in",
      home: "Home",
      drivers: "Drivers",
      passengers: "Passengers",
      students: "For Students",
      trips: "Trips",
      trust: "Trust & Safety",
      sustainability: "Sustainability",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      help: "Help Center",
    },
    fr: {
      brand: "HopIn",
      signup: "S'inscrire",
      login: "Se connecter",
      home: "Accueil",
      drivers: "Chauffeurs",
      passengers: "Passagers",
      students: "Pour Étudiants",
      trips: "Trajets",
      trust: "Confiance & Sécurité",
      sustainability: "Durabilité",
      legal: "Légal",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      help: "Centre d'aide",
    },
  };

  const t = texts[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * HOOK
 */
export function useLanguage() {
  return useContext(LanguageContext);
}
