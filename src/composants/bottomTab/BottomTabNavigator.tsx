import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Link from "next/link";
import { useRouter } from "next/router";

const BottomBar = () => {
  const router = useRouter();

  const handleNavigateToProfile = () => {
    router.push("/Profile");
  };
  const handleNavigateToRechercher = () => {
    router.push("/Rechercher");
  };
  const handleNavigateToMessages = () => {
    router.push("/Messages");
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={[styles.tab, router.pathname === "/Profile" && { opacity: 0.3 }]}
        onPress={handleNavigateToProfile}
      >
        <Text style={styles.tabText}>Profil</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        style={[
          styles.tab,
          router.pathname === "/Rechercher" && { opacity: 0.3 },
        ]}
        onPress={handleNavigateToRechercher}
      >
        <Text style={styles.tabText}>Rechercher</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        style={[
          styles.tab,
          router.pathname === "/Messages" && { opacity: 0.3 },
        ]}
        onPress={handleNavigateToMessages}
      >
        <Text style={styles.tabText}>Messages</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopWidth: 4,
    borderTopColor: "#622bb5",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 2, // Définissez l'opacité par défaut à 1 pour que les autres onglets ne soient pas grisés
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#622bb5",
    textDecorationLine: "none",
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "#cccccc",
  },
});

export default BottomBar;
