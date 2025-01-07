import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
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
import { useAuthStore } from '../../store/useAuthstore';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { authUser, onlineUsers } = useAuthStore();
  const navigation = useNavigation()
  console.log(onlineUsers);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.greetingsBar}>
          <Image source={avatar} style={styles.avatar} />
          <Text style={styles.greetingsText}>Hello 👋, {authUser.fullName} </Text>
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

        <View style={styles.iconsContainer}>
          <View style={styles.iconWrapper} >
        <TouchableOpacity onPress={()=>navigation.navigate('Document')}>
        <Icon name="cloud" size={40} color="#5553FC" />
        <Text style={styles.iconText}>Drive</Text>
        </TouchableOpacity>
          </View>
          <View style={styles.iconWrapper}>
            <Icon name="file-text" size={40} color="#5553FC" />
            <Text style={styles.iconText}>Document</Text>
          </View>
          <View style={styles.iconWrapper}>
            <Icon name="video" size={40} color="#5553FC" />
            <Text style={styles.iconText}>Meet</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

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
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginVertical: 20,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 16,
    color: '#5553FC',
    fontWeight: '500',
  },
});

export default HomeScreen;
