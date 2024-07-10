import errors from "../../messages/error";
import success from "../../messages/success";
import {
  auth,
  firestore,
  functions,
} from "../../configs/firebase-service.config";
import { Alert, UserData, SignUpRes } from "../../types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import Sports from "../../../pages/Profile";

const authServices = {
  signUpWithEmailAndPassword(
    email: string,
    password: string,
    userData?: UserData
  ): Promise<Alert> {
    return new Promise((res, rej) => {
      const createNewUserWithMail = httpsCallable(
        functions,
        "createNewUserWithMail"
      );
      console.log(userData);
      createNewUserWithMail({ email, password, userData })
        .then((result: any) => {
          console.log("compte créer");
          if (result.data.status == "ERROR") {
            if (result.data.fbCode == "auth/email-already-exists") {
              // If email already exists custom error
              rej(errors.USER_ALREADY_EXISTS_ERROR_ALERT);
            }
          } else {
            res(success.SIGNUP_SUCCESS_ALERT);
          }
        })
        .catch((e) => {
          console.log("Erreur création de compte", e);
          if (e.code == "auth/email-already-in-use") {
            // Custom error
            rej(errors.USER_ALREADY_EXISTS_ERROR_ALERT);
          } else if (e.code == "auth/invalid-email") {
            rej(errors.EMAIL);
          } else {
            rej(errors.ERROR_GENERIC);
          }
        });
    });
  },

  signInWithEmailAndPassword(email: string, password: string): Promise<void> {
    return new Promise((res, rej) => {
      // handle user auth persistence depending on rememberMe value
      signInWithEmailAndPassword(auth, email, password)
        .then(async (data) => {
          res();
        })
        .catch((e) => {
          if (e.code == "auth/user-not-found") {
            // Custom error
            rej(errors.USER_NOT_FOUND_ERROR_ALERT);
          } else if (e.code == "auth/wrong-password") {
            // Custom error
            rej(errors.WRONG_USER_PASSWORD_ERROR_ALERT);
          }
          // Generic error
          rej(errors.SIGNIN_ERROR_ALERT);
        });
    });
  },
  listenToUserData(userId: string, listenerCallback: Function) {
    const userDataDoc = doc(firestore, "users", userId);

    const userDataListener = onSnapshot(userDataDoc, async (userDataSnap) => {
      let userData: UserData;
      if (userDataSnap.exists) {
        userData = userDataSnap.data() as UserData;
      }
      listenerCallback(userData);
    });
    return userDataListener;
  },
  updateUserData(
    pseudo: string,
    adresse: string,
    telephone: string,
    userData?: UserData
  ): Promise<Alert> {
    return new Promise((res, rej) => {
      const updateProfileData = httpsCallable<any, SignUpRes>(
        functions,
        "updateProfileData"
      );
      updateProfileData({ profileData: { pseudo, adresse, telephone } })
        .then((result) => {
          if (result.data.status == "ERROR") {
            if (result.data.fbCode == "Adress-already-in-use") {
              // If email already exists custom error
              rej({
                header: "Erreur",
                detail: "L'adresse  est déjà enregistrée sur un autre compte",
              });
            } else {
              // generic error
              rej(errors.PERSONAL_DATA_ERROR);
            }
          } else {
            return res(success.PERSONAL_DATA_SUCCES);
          }
        })
        .catch((e) => {
          console.log(e);
          return rej(errors.PERSONAL_DATA_ERROR);
        });
    });
  },
  updateSportsPalmares(sportsPalmares: Record<string, any>[]): Promise<Alert> {
    return new Promise((res, rej) => {
      const updateSportsPalmares = httpsCallable<any, SignUpRes>(
        functions,
        "updateSportsPalmares"
      );
      updateSportsPalmares({ sportsPalmares: sportsPalmares })
        .then((result) => {
          if (result.data.status == "ERROR") {
            // Gérer les erreurs si nécessaire
            rej(errors.PERSONAL_DATA_ERROR);
          } else {
            return res(success.PERSONAL_DATA_SUCCES);
          }
        })
        .catch((e) => {
          console.log(e);
          rej(errors.PERSONAL_DATA_ERROR);
        });
    });
  },
};

export default authServices;
