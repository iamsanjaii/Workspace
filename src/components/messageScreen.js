import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { io } from "socket.io-client";
import moment from "moment";
import defaultImage from '../../assets/user.png'
import { useChatStore } from "../store/useChatstore";
import Loading from "../screens/loading";
import { useAuthStore } from "../store/useAuthstore";

const MessageScreen = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef();
  const typingTimeoutRef = useRef(null);

  const { authUser, onlineUsers } = useAuthStore();
  const {
    messages,
    getMessages,
    ismessageLoading,
    selectedUser,
    setSelectedUser,
    listenMessage,
    unlistenMessage,
    sendMessage,
  } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    listenMessage();

    return () => unlistenMessage();
  }, [selectedUser._id, getMessages, listenMessage, unlistenMessage]);

  useEffect(() => {
    if (scrollViewRef.current && messages) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleBackPress = () => {
    setSelectedUser(null);
    navigation.goBack();
  };

  const handleTypingFeedback = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    try {
      await sendMessage({
        text: message.trim(),
      });
      setMessage("");
    } catch (error) {
      console.log("Failed to Send Message", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5553FC" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

          <View style={styles.UserContainer}>
            <View style={styles.TextInfoContainer}>
              <Text style={styles.UserText}>
                {selectedUser ? selectedUser.fullName : "User"}
              </Text>
              {onlineUsers.includes(selectedUser._id) ? (
                <Text style={styles.onlineText}>
                  <View style={styles.OnlineCircle}></View> Online
                </Text>
              ) : (
                <Text style={styles.onlineText}>Offline</Text>
              )}
            </View>
            <Image style={styles.Avatar} source={defaultImage} />
          </View>
        </View>

        <View style={styles.messageContainer}>
          {ismessageLoading ? (
            <Loading />
          ) : (
            <ScrollView ref={scrollViewRef}>
              {messages
                .filter((message) => message && message.senderId)
                .map((message) => (
                  <View
                    key={message._id}
                    style={
                      message.senderId === authUser._id
                        ? styles.sentMessage
                        : styles.receivedMessage
                    }
                  >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {message.senderId === selectedUser._id
                        ? selectedUser.fullName
                        : "You"}
                    </Text>
                    <Text style={styles.msg}>{message.text}</Text>
                    <Text style={styles.msgTime}>
                      {moment(message.createdAt).format("HH:mm")}
                    </Text>
                  </View>
                ))}
            </ScrollView>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={message}
              onChangeText={(text) => {
                setMessage(text);
                handleTypingFeedback();
              }}
              onFocus={handleTypingFeedback}
              placeholder="Type a message..."
              placeholderTextColor="#888"
              multiline
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              style={styles.sendIconContainer}
            >
              <Icon name="send" size={30} color="#5553FC" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5553FC",
    justifyContent: "space-between",
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: { padding: 10 },
  UserContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  Avatar: { width: 50, height: 50, borderRadius: 25 },
  UserText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  TextInfoContainer: { alignItems: "flex-end" },
  onlineText: { fontSize: 12, color: "#fff" },
  OnlineCircle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "#32CD32",
    marginRight: 5,
  },
  messageContainer: { flex: 1, padding: 15 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  textInput: { flex: 1, fontSize: 16 },
  sendIconContainer: { padding: 10 },
  receivedMessage: {
    backgroundColor: "#D4D4FE",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "60%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#D4D4FE",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "60%",
  },
  msg: { fontSize: 16 },
  msgTime: { fontSize: 10, textAlign: "right" },
});

export default MessageScreen;
