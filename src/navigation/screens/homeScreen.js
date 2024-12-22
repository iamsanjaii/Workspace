import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatar from '../../../assets/man.png';
import Icon from 'react-native-vector-icons/Feather';
import People from '../../../assets/user.png';
import Peter from '../../../assets/peter.jpeg';
import User1 from '../../../assets/1.jpg';
import User2 from '../../../assets/2.jpg';
import User3 from '../../../assets/3.jpg';

import Person from '../../components/Person';
import Card from '../../components/Card';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('userId')

        
        if (!token || !userId) {
          console.log('No token or userId found!');
          return;
        }
        const response = await axios.get(`http://localhost:4800/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        setUser(response.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.greetingsBar}>
   

          <Image source={user.avatar ? { uri: user.avatar } : avatar} style={styles.avatar} />
          <Text style={styles.greetingsText}>Hello 👋, {user.name} </Text>
        </View>

        <View style={styles.searchBarContainer}>
          <Icon name="search" size={20} color="#5553FC" style={styles.searchIcon} />
          <TextInput style={styles.searchBar} placeholder="Search" />
        </View>

        <ScrollView 
          horizontal 
          contentContainerStyle={styles.peopleScrollContainer} 
          showsHorizontalScrollIndicator={false}
        >
          <Person name="Sanjai" avatar={User2} />
          <Person name="Joe" avatar={User1} />
          <Person name="Ben" avatar={User3} />
          <Person name="Parker" avatar={People} />
          <Person name="Peter" avatar={Peter} />
          <Person name="Sanjai" avatar={avatar} />
          <Person name="Sanjai" avatar={People} />
          <Person name="Sanjai" avatar={People} />
        </ScrollView>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    margin: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  greetingsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#5553FC',
    borderWidth: 2,
  },
  greetingsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5553FC',
    marginLeft: 5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginVertical: 15,
    width: '90%',
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 10,
    color: '#ccc',
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  peopleScrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
