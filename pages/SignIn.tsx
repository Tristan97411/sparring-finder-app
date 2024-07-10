import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Pressable,
} from "react-native";
import authServices from "../src/services/apis/auth-service";
import { Alert } from "../src/types";
import AuthContext, { AuthStates } from "../src/contexts/auth.ctx";
import RootProvider from "../src/contexts/@store/RootProvider";
import { useRouter } from "next/router";

export default function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  console.log(
    authCtx.authState == AuthStates.AUTH
      ? "Utilisateur connecté"
      : "Utilisateur non connecté"
  );
  console.log(authCtx);
  const signInUser = async () => {
    try {
      setIsLoading(true);
      await authServices.signInWithEmailAndPassword(email, password);
      // Rediriger l'utilisateur vers une page appropriée après connexion
      router.push("/Profile");
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);
      alert(err.detail);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.width}>
        <View>
          <Text style={styles.text}>Email</Text>

          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Renseigner votre email ici"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.text}>Mot de passe</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder="Renseigner votre mot de passe ici"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <Pressable style={styles.buttonConnecter} onPress={signInUser}>
          {isLoading ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <Text style={styles.TextConnecter}>Se Connecter</Text>
          )}
        </Pressable>
        {/* <Ionicons name="camera" size={10} color="#622bb5"></Ionicons> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cacbcc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "80%",
  },
  width: {
    width: "75%",
  },
  text: {
    fontSize: 18,
    padding: 10,
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "#e3e3e1",
    borderRadius: 5,
    shadowRadius: 5,
    padding: 10,
    shadowColor: "#9a9c9a",
  },
  buttonPalmares: {
    backgroundColor: "#FFFCFC",
    padding: 9,
    marginTop: 20,
    fontWeight: "bold",
    width: "100%",
    borderRadius: 6,
    borderColor: "#622bb5",
    borderWidth: 3,
    alignItems: "center",
  },
  buttonConnecter: {
    backgroundColor: "#622bb5",
    padding: 9,
    marginTop: 10,
    fontWeight: "bold",
    width: "100%",
    borderRadius: 6,
    borderColor: "#622bb5",
    borderWidth: 3,
    alignItems: "center",
    color: "#622bb5",
  },
  ImageBackground: {
    width: 100, // Largeur de la zone
    height: 100, // Hauteur de la zone
    borderRadius: 50, // Crée un cercle avec un rayon de 50% de la largeur/hauteur
    borderColor: "#622bb5",
    overflow: "hidden",
  },
  TextConnecter: {
    color: "white",
    fontWeight: "bold",
  },
});
