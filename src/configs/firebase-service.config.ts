import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import "firebase/analytics";
import { getAuth, connectAuthEmulator, initializeAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6VMyV0vvLwemmrEVKl3ebUTvASJnYmSY",
  authDomain: "sparring-finder.firebaseapp.com",
  projectId: "sparring-finder",
  storageBucket: "sparring-finder.appspot.com",
  messagingSenderId: "280118670296",
  appId: "1:280118670296:web:534bce67a4975263ad38ad",
  measurementId: "G-9HMTVC9G8K",
};

const emulators = {
  auth: {
    host: "127.0.0.1",
    port: 9099,
  },
  functions: {
    host: "127.0.0.1",
    port: 5001,
  },
  firestore: {
    host: "127.0.0.1",
    port: 8080,
  },
  storage: {
    host: "127.0.0.1",
    port: 9199,
  },
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const functions = getFunctions(app);

const storage = getStorage(app);
const auth = getAuth(app);

if (process.env.NODE_ENV == "development") {
  connectFirestoreEmulator(
    firestore,
    emulators.firestore.host,
    emulators.firestore.port
  );
  connectFunctionsEmulator(
    functions,
    emulators.functions.host,
    emulators.functions.port
  );
  connectStorageEmulator(
    storage,
    emulators.storage.host,
    emulators.storage.port
  );
  connectAuthEmulator(
    auth,
    `http://${emulators.auth.host}:${emulators.auth.port}`
  );
}

export { firestore, functions, auth, storage };
