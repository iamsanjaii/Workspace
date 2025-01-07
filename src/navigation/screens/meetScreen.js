import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuthStore } from '../../store/useAuthstore';
import videoChatImg from '../../../assets/user.png'; 
import { useNavigation } from '@react-navigation/native';
import { useChatStore } from '../../store/useChatstore';

const MeetScreen = () => {
  const { authUser } = useAuthStore();
  const navigation = useNavigation();
  const { creatNewMeet, Roomid } = useChatStore();
  const [roomIdState, setRoomIdState] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false); 
  const [roomIdInput, setRoomIdInput] = useState(""); 

  useEffect(() => {
    if (Roomid) {
      setRoomIdState(Roomid);
    }
  }, [Roomid]);

  const createMeet = async () => {
    await creatNewMeet();
    if (roomIdState) {
      Alert.alert("Room Id:", roomIdState);
    } else {
      Alert.alert("Failed to create a room");
    }
  };

  const joinMeet = () => {
    if (roomIdInput) {
      Alert.alert("Joining Room", `Room ID: ${roomIdInput}`);
    
    } else {
      Alert.alert("Please enter a valid Room ID");
    }
    setModalVisible(false); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.greetings}>
          <Text style={styles.greetingText}>Hey {authUser?.fullName || 'User'}</Text>
          <Text style={styles.subText}>No Meetings Have Been Scheduled</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={videoChatImg} style={styles.videoChat} />
        </View>
        <TouchableOpacity style={styles.meetButton} onPress={createMeet}>
          <Text style={styles.meetButtonText}>Create an Instant Meeting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinmeetButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.joinmeetButtonText}>Join an Existing Meet</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('NewMeet')}
        accessibilityLabel="Create a new meeting"
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Room ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Room ID"
              value={roomIdInput}
              onChangeText={setRoomIdInput}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={joinMeet}>
                <Text style={styles.modalButtonText}>Join Room</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    paddingHorizontal: 20,
  },
  greetings: {
    marginTop: 40,
  },
  greetingText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  videoChat: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  meetButton: {
    padding: 10,
    backgroundColor: '#5553FC',
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinmeetButton: {
    padding: 10,
    borderColor: '#5553FC',
    borderWidth: 2,
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  meetButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  joinmeetButtonText: {
    fontSize: 16,
    color: '#5553FC',
    fontWeight: '600',
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#5553FC',
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#5553FC',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default MeetScreen;
