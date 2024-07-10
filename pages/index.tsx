import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Messages from "./Messages";
import Profile from "./Profile";
import Rechercher from "./Rechercher";
import { useRouter } from "next/router";
import AuthContext, { AuthStates } from "../src/contexts/auth.ctx";
import BottomBar from "../src/composants/bottomTab/BottomTabNavigator";

export { BottomBar };
export default function App() {
  const authCtx = useContext(AuthContext);

  if (authCtx.authState == AuthStates.NOT_AUTH) {
    const router = useRouter();
    router.push("/SignUp");
  }

  return (
    <View style={styles.container}>
      <View style={styles.BottomBar}>
        <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
        <BottomBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    fontSize: 16,
  },
  BottomBar: {
    flex: 1,
  },
});
