import React from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Welcome to Firebase App</Text>

      <Link
        href="/(auth)/Registration"
        style={{ marginTop: 20, fontSize: 18, color: "blue" }}
      >
        Go to Registration
      </Link>
    </View>
  );
}
