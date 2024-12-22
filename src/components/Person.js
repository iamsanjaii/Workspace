import React from 'react';
import { StyleSheet, View ,Image,Text} from 'react-native';
import avatar from '../../assets/man.png'

const Person = ({name,avatar}) => {
    return (
         <View style={styles.person}>
               <Image style={styles.personAvatar} source={avatar} />
               <Text style={styles.personName}>{name}</Text>
           </View>
    );
}

const styles = StyleSheet.create({
    person: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    personAvatar: {
        width: 55,
        height: 55,
        borderRadius: 30,
        borderColor: '#5553FC',
        borderWidth: 2,
    },
    personName: {
        marginTop: 2,
        fontSize: 12,
        fontWeight: '600',
        color: '#625F5F',
        textAlign: 'center',
    },
})

export default Person;
