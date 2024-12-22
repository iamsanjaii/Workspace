import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  
    const [username, setUsername] = useState('');
    const navigation = useNavigation()

    useEffect(() => {
 
      AsyncStorage.getItem('username')
        .then((name) => {
          if (name) {
            setUsername(name);
          }
        })
        .catch((err) => {
          console.error('Error retrieving username:', err);
        });
    }, []);

    function logout(){
        AsyncStorage.clear().then(()=>{
            Alert.alert("You Have Been LoggedOut Successfully")
            navigation.navigate("Login")
        }).catch(err=>{console.log(err)})
    }
    return (
        <View style={styles.Container}>
            <Text style={styles.Text}>Hello {username}</Text>
            <TouchableOpacity style={styles.LogoutButton} onPress={()=>logout()}>
                <Text style={styles.LoginText}>LogOut</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Container:{
        flex:1,

        justifyContent:"center",
        alignItems:'center'

    },
    Text:{
        textAlign:'center'
    },
    LogoutButton:{
       backgroundColor: "#3662AA",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    },
    LoginText:{
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    }
})

export default Dashboard;
