import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const Videochat = () => {
    return (
        <SafeAreaView style={styles.container}>
<Text>Video Here</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
container:{
    flex: 1,
    backgroundColor: '#fff',
}
})

export default Videochat;
