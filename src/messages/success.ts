const success = {
  SIGNUP_SUCCESS_ALERT: {
    header: "Création du compte réussie !",
    detail: "Vous allez être redirigé vers l'écran de connexion.",
  },
  SEND_PASSWORD_RESET_EMAIL_SUCCESS_ALERT: {
    header: "Un email de récupération a été envoyé",
    detail: (email: string) =>
      `Vous allez recevoir à l'adresse ${email} les instructions pour réinitialiser votre mot de passe.`,
  },
  PASSWORD_RESET_SUCCESS_ALERT: {
    header: "Mot de passe mis à jour avec succès!",
    detail: `Vous pouvez vous connecter avec votre nouveau mot de passe`,
  },
  USER_INFOS_UPDATE_SUCCESS_ALERT: {
    header: "Informations mise à jour !",
    detail: "Les informations ont été correctement mises à jour.",
  },
  PASSWORD_UPDATE_SUCCESS_ALERT: {
    header: "Mot de passe mis à jour !",
    detail: "Le mot de passe a été correctement mis à jour.",
  },
  PERSONAL_DATA_SUCCES: {
    header: "Succès !",
    detail: "Vos données personnelles ont bien été mis à jour !",
  },
  WALLET_ADDRESS_CREATE_SUCCES: {
    header: "Succès !",
    detail: "L'adresse wallet a bien été ajouté!",
  },
  WALLET_ADDRESS_DELETE_SUCCES: {
    header: "Succès !",
    detail: "L'adresse wallet a bien été supprimé!",
  },
  EMAIL_UPDATE_SUCCESS_ALERT: {
    header: "Email mis à jour !",
    detail: "L'adresse mail' a été correctement mis à jour.",
  },
};

export default success;
