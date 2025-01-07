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
} from "react-native";
import React, { useActionState, useReducer, useState } from "react";
import { Feather } from "@expo/vector-icons";
import googleLogo from "../assets/image.png";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { useAuthStore } from "../src/store/useAuthstore";
import { ActivityIndicator } from "react-native"; 
// import dotenv from 'dotenv';
// dotenv.config()



const Register = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigation = useNavigation();
  const {signup, isSigningup} = useAuthStore();

  const userData = {
    fullName: name,
    email: email,
    password: password,
  };




  const validate =()=>{
    if(!userData.fullName.trim()) return Alert.alert("Name is Required");
    if(!userData.email.trim()) return Alert.alert("Email is Required")
    if(!userData.password.trim()) return Alert.alert("password is Required")
      if(userData.password.length < 6) return Alert.alert('Password length minimum atleast 6')

    return true
  }
  
  const handleRegister = ()=>{
const success = validate();
if(success === true) signup(userData)
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="user" size={22} color={"#7c808d"} />
            </View>
            <TextInput
              style={styles.input}
              placeholderTextColor={"#7c808D"}
              placeholder="Name"
              selectionColor={"#3662AA"}
              onChangeText={setName}
              value={name}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="mail" size={22} color={"#7c808d"} />
            </View>
            <TextInput
              style={styles.input}
              placeholderTextColor={"#7c808D"}
              placeholder="Email"
              selectionColor={"#3662AA"}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="phone" size={22} color={"#7c808d"} />
            </View>
            <TextInput
              style={styles.input}
              placeholderTextColor={"#7c808D"}
              placeholder="Mobile"
              selectionColor={"#3662AA"}
              onChangeText={setMobile}
              value={mobile}
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
          <TouchableOpacity
  style={styles.loginButton}
  onPress={() => handleRegister()}
  disabled={isSigningup} 
>
  {isSigningup ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={styles.loginButtonText}>Create Account</Text>
  )}
</TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orLineText}>OR</Text>
            <View style={styles.orLine} />
          </View>
          <TouchableOpacity style={styles.loginwithGoogleButton} onPress={() => console.warn('')}>
            <Image style={styles.googleLogo} source={googleLogo} />
            <Text style={styles.googleButtonText}>Login With Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RegisterButton}>
            <Text style={styles.RegisterButtonText}>
              Have an Account Already?{" "}
              <Text style={styles.RegisterButtonTextHighlight} onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

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
  loginButton: {
    backgroundColor: "#3662AA",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
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
