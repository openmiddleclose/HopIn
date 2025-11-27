// src/utils/translate.js

export const dictionary = {
  // Authentication
  "Login": "Se connecter",
  "Log in": "Se connecter",
  "Sign up": "S'inscrire",
  "Create account": "Créer un compte",
  "Continue": "Continuer",
  "Email": "Email",
  "Password": "Mot de passe",
  "Forgot password?": "Mot de passe oublié ?",
  "Reset Password": "Réinitialiser le mot de passe",

  // General Navigation
  "Home": "Accueil",
  "Trips": "Trajets",
  "Passengers": "Passagers",
  "Drivers": "Conducteurs",
  "For Students": "Pour les étudiants",
  "How it works": "Comment ça marche",
  "Help": "Aide",
  "Help Center": "Centre d'aide",
  "About": "À propos",
  "Contact": "Contact",
  "Settings": "Paramètres",
  "Profile": "Profil",
  "Logout": "Se déconnecter",

  // Footer
  "We're hiring!": "Nous recrutons !",
  "Download our app": "Télécharger notre application",
  "Connect with us": "Connectez-vous avec nous",
  "Privacy Policy": "Politique de confidentialité",
  "Terms of Service": "Conditions d'utilisation",
  "All rights reserved.": "Tous droits réservés.",

  // Trust & Safety
  "Trust & Safety": "Confiance et sécurité",
  "Verified drivers": "Conducteurs vérifiés",
  "Community guidelines": "Règles de la communauté",
  "Safety tips": "Conseils de sécurité",

  // Students
  "Student Rides": "Trajets étudiants",
  "Campus Rides": "Trajets campus",
  "Student Discounts": "Réductions étudiantes",

  // Trips / Ride creation
  "Create Trip": "Créer un trajet",
  "Find a Trip": "Trouver un trajet",
  "Book seat": "Réserver un siège",
  "Available seats": "Places disponibles",
  "Departure": "Départ",
  "Arrival": "Arrivée",
  "Date": "Date",
  "Time": "Heure",
  "Price": "Prix",
  "Driver": "Conducteur",
  "Passenger": "Passager",
  "Book now": "Réserver maintenant",
  "Confirm ride": "Confirmer le trajet",

  // Payments / Wallet
  "Payment": "Paiement",
  "Payment method": "Méthode de paiement",
  "Add card": "Ajouter une carte",
  "Total cost": "Coût total",
  "Confirm payment": "Confirmer le paiement",

  // Notifications
  "Notifications": "Notifications",
  "New": "Nouveau",
  "Unread": "Non lu",

  // Search / Filters
  "Search": "Rechercher",
  "Filter": "Filtrer",
  "Sort": "Trier",
  "Apply filters": "Appliquer les filtres",

  // Buttons / Small UI Text
  "Next": "Suivant",
  "Back": "Retour",
  "Cancel": "Annuler",
  "Save": "Enregistrer",
  "Submit": "Soumettre",
  "Edit": "Modifier",
  "Delete": "Supprimer",
  "View more": "Voir plus",
  "Load more": "Charger plus",

  // Error / Status Messages
  "Loading...": "Chargement...",
  "No data found": "Aucune donnée trouvée",
  "Something went wrong": "Une erreur s'est produite",
  "Please wait": "Veuillez patienter",

  // Misc
  "Events & Festivals": "Événements et festivals",
  "News": "Actualités",
  "Blog": "Blog",
  "Locations": "Emplacements",
  "Impact": "Impact",
  "Sustainability": "Durabilité",
};

export function translate(text, lang) {
  if (lang === "fr" && dictionary[text]) return dictionary[text];
  return text; // default to English
}
