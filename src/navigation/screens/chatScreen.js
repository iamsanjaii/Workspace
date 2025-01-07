import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import People from '../../../assets/user.png';
import Peter from '../../../assets/peter.jpeg';
import User1 from '../../../assets/1.jpg';
import User2 from '../../../assets/2.jpg';
import User3 from '../../../assets/3.jpg';
import avatar from '../../../assets/man.png';
import { Image } from 'react-native';
import Person from '../../components/Person';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/useAuthstore';
import { useChatStore } from '../../store/useChatstore';




const ChatScreen = () => {
    const navigation = useNavigation();
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isloading, setisLoading] = useState('')

    const {onlineUsers} = useAuthStore()
    const {getUsers, isUsersLoading,selectedUser, setSelectedUser, users} = useChatStore()



    useEffect(()=>{
        getUsers()
    },[getUsers])
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filteredData = fullData.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setData(filteredData);
    };

    const handleNewMessage = () => {
        navigation.navigate('NewMessage');
    };



    if (isloading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#5500dc" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.searchBarContainer}>
                    <Icon name="search" size={20} color="#5553FC" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={(query) => handleSearch(query)}
                    />
                </View>

                <ScrollView horizontal contentContainerStyle={styles.peopleScrollContainer} showsHorizontalScrollIndicator={false}>
                    <Person key="1" name="Sanjai" avatar={User2} />
                    <Person key="2" name="Joe" avatar={User1} />
                    <Person key="3" name="Ben" avatar={User3} />
                    <Person key="4" name="Parker" avatar={People} />
                    <Person key="5" name="Peter" avatar={Peter} />
                    <Person key="6" name="Sanjai" avatar={avatar} />
                    <Person key="7" name="Sanjai" avatar={People} />
                    <Person key="8" name="Sanjai" avatar={People} />
                </ScrollView>

                {users.map((user) => {
                    return ( <TouchableOpacity onPress={()=>{setSelectedUser(user), navigation.navigate('Message')}}>
                                <View style={styles.ChatContainer}>
                                    <Image source={avatar ? avatar : defaultimage} style={styles.avatar} />
                                    <View style={styles.chatTextContainer}>
                                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{user.fullName}</Text>
                                        <Text style={{ fontSize: 12, fontWeight: '300', color: '#625F5F' }}>Hi Sanjai</Text>
                                        <Text style={{ fontSize: 9, fontWeight: '400', color: '#625F5F', textAlign: 'right' }}>{onlineUsers.includes(user._id) ? "Online" : "Offline"}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>)
                }
              
                )}

            </ScrollView>

            <TouchableOpacity style={styles.floatingButton} onPress={() => { navigation.navigate('NewMessage'); }}>
                <Icon name="comments" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.GroupButton} onPress={handleNewMessage}>
                <Icon name="group" size={30} color="#fff" />
            </TouchableOpacity>
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
        flexGrow: 0,
        alignItems: 'center',
        paddingHorizontal: 6,
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
        paddingHorizontal: 8,
    },
    chatContainer: {
        width: '100%',
        marginBottom: 60,
    },
    messageContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 15,
        maxWidth: '80%',
    },
    sentMessage: {
        backgroundColor: '#5C6BC0',
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        backgroundColor: '#E0E0E0',
        alignSelf: 'flex-start',
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
    },
    otherUserName: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
        textAlign: 'right',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: '#5553FC',
        borderRadius: 50,
        padding: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    GroupButton: {
        position: 'absolute',
        bottom: 160,
        right: 20,
        backgroundColor: '#5553FC',
        borderRadius: 50,
        padding: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    ChatContainer:{
        marginTop:4,
        backgroundColor:"#F0F0FF",
        width: '100%',
        flexDirection:'row',
        paddingHorizontal: 14,
        paddingVertical:8,
        borderRadius:12
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    chatTextContainer:{
        flexDirection:'column',
        paddingHorizontal:10,
        flex:1
    }
});

export default ChatScreen;
