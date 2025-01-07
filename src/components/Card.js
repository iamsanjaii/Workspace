import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Card = ({name ,since}) => {


    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardLogo}>WorkSpace</Text>
            </View>
            <Text style={styles.cardNumber}>**** **** **** 1234</Text>
            <View style={styles.cardFooter}>
                <Text style={styles.cardDetails}>
                    {name}
                </Text>
                <Text style={styles.cardDetails}>SINCE: {since}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        height: 200,
        backgroundColor: '#1E2A47',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        marginTop: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLogo: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardNumber: {
        fontSize: 22,
        color: '#fff',
        marginTop: 20,
        letterSpacing: 3,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
        marginTop:10
    
    },
    cardDetails: {
        color: '#fff',
        fontSize: 14,
        flex:1,
        textOverflow:"ellipsis"
    },
});

export default Card;
