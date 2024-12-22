import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import googleLogo from "../assets/image.png";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../src/navigation/Authcontext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { token, setToken } = useContext(AuthContext);


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    const userInput = { email, password };
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:4800/api/login", userInput, {
        timeout: 10000,
      });
  
      const data = response.data;
  
      if (data?.token) {
        await AsyncStorage.setItem("authToken", data.token);
        await AsyncStorage.setItem('userId', data.user.id.toString()); 
        await AsyncStorage.setItem('userName', data.user.name);
        await AsyncStorage.setItem('userEmail', data.user.email);
        setToken(data.token);
        Alert.alert("Success", "Login successful!");
  
      } else {
        Alert.alert("Error", data.message || "Failed to retrieve token from server");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert(
        "Login Error",
        error.response?.data?.message || "Network error: Unable to complete login"
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="mail" size={22} color={"#7c808d"} />
            </View>
            <TextInput
              style={styles.input}
              placeholderTextColor={"#7c808D"}
              placeholder="Email"
              selectionColor={"#3662AA"}
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="lock" size={22} color={"#7c808d"} />
            </View>
            <TextInput
              style={styles.input}
              placeholderTextColor={"#7c808D"}
              placeholder="Password"
              secureTextEntry={passwordVisible}
              onChangeText={setPassword}
              value={password}
              selectionColor={"#3662AA"}
            />
            <TouchableOpacity
              style={styles.passwordVisible}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Feather
                name={passwordVisible ? "eye-off" : "eye"}
                size={20}
                color={"#7c808d"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orLineText}>OR</Text>
            <View style={styles.orLine} />
          </View>
          <TouchableOpacity style={styles.loginwithGoogleButton}>
            <Image style={styles.googleLogo} source={googleLogo} />
            <Text style={styles.googleButtonText}>Login With Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RegisterButton}>
            <Text style={styles.RegisterButtonText}>
              Not Have an Account Yet?{" "}
              <Text
                style={styles.RegisterButtonTextHighlight}
                onPress={() => navigation.navigate("Register")}
              >
                Register One!
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  icon: {
    marginRight: 15,
  },
  input: {
    borderBottomWidth: 1.5,
    flex: 1,
    paddingBottom: 10,
    borderBottomColor: "#eee",
    fontSize: 16,
  },
  passwordVisible: {
    position: "absolute",
    right: 0,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: "#3662AA",
    fontSize: 16,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#3662AA",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  orLine: {
    height: 1,
    backgroundColor: "#eee",
    flex: 1,
  },
  orLineText: {
    color: "#7C808D",
    marginRight: 10,
    marginLeft: 10,
    fontSize: 14,
  },
  loginwithGoogleButton: {
    backgroundColor: "#f2f6f2",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
  },
  googleButtonText: {
    color: "#4e5867",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
  googleLogo: {
    width: 20.03,
    height: 20.44,
    position: "absolute",
    left: 14,
  },
  RegisterButton: {
    alignItems: "center",
    marginTop: 40,
  },
  RegisterButtonText: {
    fontSize: 16,
    color: "#76808d",
  },
  RegisterButtonTextHighlight: {
    fontSize: 16,
    color: "#3662AA",
    fontWeight: "500",
  },
});
