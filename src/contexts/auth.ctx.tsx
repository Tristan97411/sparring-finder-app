// React
import React, { useEffect, useState, PropsWithChildren } from "react";

// Services
import { auth } from "../configs/firebase-service.config";
import { UserData } from "../types";
import authServices from "../services/apis/auth-service";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Auth states
export enum AuthStates {
  "AUTH",
  "NOT_AUTH",
  "NOT_INIT",
}

const AuthContext = React.createContext({
  authState: AuthStates.NOT_INIT,
  userId: "",
  userEmail: "",
  userData: {} as UserData,
  isLoading: false,
  initUserData: () => {},
  signOut: async (): Promise<void> => {},
});

export const AuthContextProvider: React.FC<PropsWithChildren> = (
  props: any
) => {
  const [authState, setAuthState] = useState(AuthStates.NOT_INIT);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [rtListenersList, setRtListenersList] = useState([] as Function[]);

  const initUserData = () => {
    const userDataListener: Function = authServices.listenToUserData(
      userId,
      (userData: UserData) => setUserData(userData)
    );

    rtListenersList.map((listener: Function) => listener());
    setRtListenersList([userDataListener]);
  };

  useEffect(() => {
    const authStateChangedUnsubscribe = auth.onAuthStateChanged((user) => {
      console.log("user : ", user);
      // unset user info if no user or logged out
      if (!user) {
        setAuthState(AuthStates.NOT_AUTH);
        setUserId("");
        setUserEmail("");
      } else {
        // Set user info if user is logged in
        console.log(user);
        user.getIdTokenResult().then((token) => {
          setAuthState(AuthStates.AUTH);
          setUserId(user.uid);
          setUserEmail(user.email || "");
        });
      }
    });
    // Unsubscribe to listener when unmounted
    return () => authStateChangedUnsubscribe();
  }, []);

  const signOutHandler = async () => {
    setisLoading(true);
    try {
      await auth.signOut();
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        userId,
        userEmail,
        userData,
        isLoading,
        initUserData,
        signOut: signOutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
