const error = {
  REQUIRED: "Ce champs est obligatoire.",
  EMAIL: "Ce champs doit être un email valide.",
  MIN_LENGTH: (nb: number) =>
    `Ce champs doit comprendre au moins ${nb} caractères.`,
  MAX_LENGTH: (nb: number) =>
    `Ce champs doit comprendre au maximum ${nb} caractères.`,
  PATTERN: (pattern: number) => `Ce champs doit avoir la forme : ${pattern}.`,
  NOT_THE_SAME: "Les champs ne correspondent pas.",
  SIGNUP_ERROR_ALERT: {
    header: "Impossible de créer un compte",
    detail:
      "Une erreur inconnue est survenue, veuillez réessayer ultérieurement.",
  },
  SIGNUP_TOS_ERROR: {
    header: "Conditions d'utilisation obligatoire",
    detail:
      "Vous devez accepter les conditions d'utilisation pour créer un compte ",
  },
  USER_ALREADY_EXISTS_ERROR_ALERT: {
    header: "Adresse email déjà utilisée",
    detail: "Un utilisateur est déjà enregistré avec cette adresse.",
  },
  SIGNIN_ERROR_ALERT: {
    header: "Impossible de se connecter",
    detail:
      "Une erreur inconnue est survenue, veuillez réessayer ultérieurement.",
  },
  WRONG_USER_PASSWORD_ERROR_ALERT: {
    header: "Le mot de passe est invalide",
    detail: "Veuillez vérifier vos informations de connexion.",
  },
  USER_NOT_FOUND_ERROR_ALERT: {
    header: "Utilisateur introuvable",
    detail: "Veuillez vérifier vos informations de connexion.",
  },
  RESET_PASSWORD_ERROR_ALERT: {
    header: "Impossible de récupérer le mot de passe",
    detail:
      "Une erreur inconnue est survenue, veuillez réessayer ultérieurement.",
  },
  RESET_PASSWORD_USER_NOT_FOUND: {
    header: "Utilisateur introuvable",
    detail: "Veuillez vérifier vos informations de connexion.",
  },
  WRONG_CREDENTIALS_PASSWORD_UPDATE_ERROR_ALERT: {
    header: "Une erreur est survenue",
    detail: "L'ancien mot de passe est incorrect, impossible de mettre à jour.",
  },
  PASSWORD_UPDATE_ERROR_ALERT: {
    header: "Une erreur est survenue",
    detail:
      "Une erreur inconnue est survenue, impossible de mettre à jour le mot de passe.",
  },
  EMAIL_UPDATE_ERROR_ALERT: {
    header: "Une erreur est survenue",
    detail:
      "Une erreur inconnue est survenue, impossible de mettre à jour l'email à jour.",
  },
  WRONG_CREDENTIALS_EMAIL_UPDATE_ERROR_ALERT: {
    header: "Une erreur est survenue",
    detail: "Le mail actuel est incorrect, impossible de mettre à jour.",
  },
  USER_INFOS_UPDATE_ERROR_ALERT: {
    header: "Une erreur est survenue",
    detail:
      "Une erreur inconnue est survenue, impossible de mettre à jour les informations.",
  },
  GOOGLE_SIGN_IN_ERROR: {
    header: "Impossible de se connecter avec Google",
    detail:
      "Une erreur inconnue est survenue, veuillez réessayer ultérieurement.",
  },
  FILE_WRONG_TYPE_ERROR: {
    header: "Type de fichier non pris en charge",
    detail: "Veuillez essayer un autre type de fichier.",
  },
  FILE_NO_FILE_SELECTED_ERROR: {
    header: "Aucun fichier séléctionner",
    detail: "Veuillez séléctionner un fichier.",
  },
  RESUME_ADD_ERROR: {
    header: "Votre CV n'a pas pu être sauvegardé",
    detail: "Veuillez nous excuser, une erreur est survenue",
  },
  RESUME_UPDATE_ERROR: {
    header: "Erreur de mise à jour",
    detail: "Votre CV n'a pas pu être mis à jour",
  },
  RESUME_STARTED_ERROR: {
    header: "Votre CV n'a pas pu être analysé",
    detail: "Veuillez nous excuser, réessayez ultérieurement",
  },
  PERSONAL_DATA_ERROR: {
    header: "Vos informations n'ont pas pu être mis à jour",
    detail: "Veuillez nous excuser, réessayez ultérieurement",
  },
  WALLET_ADDRESS_CREATE_ERROR: {
    header: "Erreur !",
    detail: "L'adresse wallet n'a pas pu être ajouté, veuillez réessayer",
  },
  WALLET_ADDRESS_DELETE_ERROR: {
    header: "Erreur !",
    detail: "L'adresse wallet n'a pas pu être supprimé, veuillez réessayer",
  },
  ERROR_GENERIC: {
    header: "Erreur !",
    detail: "Une erreur inconnue est survenue",
  },
};

export default error;
