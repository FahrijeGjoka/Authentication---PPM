import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "834956824285-hgh7tqe2ak1qeppuru8c498u4gmobq49.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      const credential = GoogleAuthProvider.credential(
        null,
        authentication.accessToken
      );

      signInWithCredential(auth, credential)
        .then(() => {
          console.log("Google login success!");
          router.push("/home");
        })
        .catch((err) => setError(err.message));
    }
  }, [response]);

  const validateInputs = () => {
    if (!email || !password) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>
            {loading ? "Logging in..." : "Log In"}
          </Text>
        </TouchableOpacity>

        {/* Google Button */}
        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/Registration")}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f2",
  },

  card: {
    backgroundColor: "white",
    width: "100%",
    padding: 25,
    borderRadius: 15,

    // Shadow
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },

    marginHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },

  btn: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 15,
  },

  googleBtn: {
    backgroundColor: "#DB4437",
    padding: 14,
    borderRadius: 8,
    marginTop: 15,
  },

  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },

  link: {
    marginTop: 10,
    textAlign: "center",
    color: "#007AFF",
  },

  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
