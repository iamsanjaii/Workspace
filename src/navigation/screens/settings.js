import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView, Image } from "react-native";
import { AuthContext } from "../Authcontext";
import defaultImage from '../../../assets/user.png'; 
import Card from "../../components/Card";

const SettingScreen = () => {
  const { setToken } = useContext(AuthContext);

  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = await AsyncStorage.getItem('userName');
        setUserName(username);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setToken(null);
      Alert.alert("Success", "You have been logged out successfully.");
    } catch (error) {
      console.error("Logout Error: ", error);
      Alert.alert("Error", "An error occurred while logging out.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.cardContainer}>

        <View style={styles.userProfile}>
          <Image source={defaultImage} style={styles.profileImage} />
          <Text style={styles.profileText}>{loading ? 'Loading...' : userName}</Text>
        </View>
        
   
 <Card name={userName} />
        
        <TouchableOpacity onPress={handleLogout} style={styles.LogoutButton}>
          <Text style={styles.LogoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  userProfile: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  LogoutButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  LogoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileText:{
    fontSize:20,
    color:'#5553FC',
    fontWeight:"700",
    textAlign:'center'
  }
});

export default SettingScreen;
