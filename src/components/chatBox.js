import React from 'react';
import { StyleSheet, View,Text,Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import defaultimage from '../../assets/1.jpg'


const ChatBox = ({ name, avatar, navigation, linktoChat}) => {
   
    return (
        <TouchableOpacity onPress={() => {linktoChat()}}>
            <View style={styles.ChatContainer}>
                <Image source={avatar ? avatar : defaultimage} style={styles.avatar} />
                <View style={styles.chatTextContainer}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{name}</Text>
                    <Text style={{ fontSize: 12, fontWeight: '300', color: '#625F5F' }}>Hi Sanjai</Text>
                    <Text style={{ fontSize: 9, fontWeight: '400', color: '#625F5F', textAlign: 'right' }}>offline</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
})

export default ChatBox;

