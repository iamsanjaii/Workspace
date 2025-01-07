import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import videoChatImg from '../../../assets/user.png'; // Placeholder image for the video chat
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const VideoChatScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.remoteVideo}>
          <Image source={videoChatImg} style={styles.remoteVideoImage} />
          <Text style={styles.remoteUserText}>Remote User</Text>
        </View>
        
        <View style={styles.localVideoContainer}>
          <Image source={videoChatImg} style={styles.localVideoImage} />
          <Text style={styles.localUserText}>You</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Icon name="mic-off" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Icon name="videocam-off" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.endCallButton}>
          <Icon name="call-end" size={30} color="#fff" />
        </TouchableOpacity>
      </View>


      {/* <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('NewMeet')} // Assuming 'NewMeet' is a navigation screen
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  remoteVideo: {
    width: width - 40,
    height: height - 200,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  remoteVideoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  remoteUserText: {
    position: 'absolute',
    bottom: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  localVideoContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 100,
    height: 150,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  localVideoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  localUserText: {
    position: 'absolute',
    bottom: 10,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 40,
  },
  controlButton: {
    marginHorizontal: 20,
    backgroundColor: '#5553FC',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  endCallButton: {
    marginHorizontal: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 50,
    padding: 20,
    elevation: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 100,
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
});

export default VideoChatScreen;
