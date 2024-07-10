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
import BottomBar from "../src/composants/bottomTab/BottomTabNavigator";

export default function Rechercher() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Rechercher</Text>
      <BottomBar />
    </View>
  );
}
