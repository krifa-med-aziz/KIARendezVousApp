import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/carBackground.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerText}>AUTOMOTIVE EXCELLENCE</Text>
        </View>

        <View style={styles.centerContent}>
          <Text style={styles.mainTitle}>KIA</Text>
          <Text style={styles.subtitle}>SERVICE</Text>
        </View>

        <View style={styles.footerContent}>
          <View style={styles.progressBar} />
          <Text style={styles.statusText}>INITIALIZING SECURE LINK</Text>
          <Text style={styles.taglineText}>Movement that inspires</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 80,
  },
  header: {
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#d32f2f",
    marginTop: 20,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  mainTitle: {
    fontSize: 88,
    fontWeight: "300",
    color: "#ffffff",
    letterSpacing: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 3,
    color: "#ffffff",
  },
  footerContent: {
    alignItems: "center",
    gap: 16,
  },
  progressBar: {
    width: 60,
    height: 2,
    backgroundColor: "#d32f2f",
    marginBottom: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 1.5,
    color: "#888888",
    marginBottom: 24,
  },
  taglineText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#ffffff",
    textAlign: "center",
  },
});
