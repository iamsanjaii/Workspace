import React from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator size="large" color="#5500dc" />
      {/* <Text>Loading</Text> */}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
