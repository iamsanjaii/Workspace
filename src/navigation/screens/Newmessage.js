import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import defaultUser from '../../../assets/user.png'; 
import MessageScreen from '../../components/messageScreen';

const Newmessage = () => {
    const API_ENDPOINT = "http://localhost:4800/api/getUsers";
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(API_ENDPOINT);
                setData(response.data.data);
               
            
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = data.filter((user) =>
        user.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    if (isLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#5500dc" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: 'red' }}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Icon2 name="arrow-back" size={30} color="#000" onPress={() => navigation.goBack()} />
                <View style={styles.searchBarContainer}>
                    <Icon name="search" size={20} color="#5553FC" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={(query) => setSearchQuery(query)}
                    />
                </View>
            </View>

            <ScrollView style={styles.userList}>
                {filteredData.map((user) => (
                  <TouchableOpacity onPress={()=>navigation.navigate('Message', { userName: user.name, id:user.id, profile:user.photo})}>
                      <View key={user.id} style={styles.userCard}>
                        <Image
                            source={user.photo ? { uri: user.photo } : defaultUser}
                            style={styles.avatar}
                        />
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>{user.name.trim()}</Text>
                            <Text style={styles.userMobile}>{user.mobile}</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        paddingHorizontal: 10,
        flex: 1,
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
    userList: {
        marginTop: 10,
        paddingHorizontal:15
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0FF',
        padding: 15,

        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    userMobile: {
        fontSize: 14,
        color: '#888',
    },
});

export default Newmessage;
