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
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userName, profile, id, allmessage } = route.params;
  const [message, setMessage] = useState("");
  const [senderid, setSenderid] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [feedback, setFeedback] = useState("");
  const scrollViewRef = useRef();
  const typingTimeoutRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const socket = useMemo(() => io("http://localhost:4800"), []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        setSenderid(userId);
      } catch (error) {
        console.error("Error getting sender's ID:", error);
      }
    };
    fetchUser();
  }, []);

  console.log('The Messages', allmessage)
  useEffect(() => {
    console.log("Raw allmessage data:", allmessage);
    console.log("Type of allmessage:", Array.isArray(allmessage) ? "Array" : typeof allmessage);
  }, [allmessage]);
  

  useEffect(() => {
    if (allmessage) {
      const messages = Array.isArray(allmessage) ? allmessage : [allmessage];
  
      const formattedMessages = messages.map((msg) => ({
        text: msg.message,
        isOwnMessage: msg.is_own_message,
        time: moment(msg.timestamp).format("HH:mm"),
      }));
  
      setMessageData((prevMessages) => [...formattedMessages, ...prevMessages]);
    } else {
      console.log("No valid allmessage data");
    }
  }, [allmessage]);
  
  
  
  


  console.log("message data",messageData)

  useEffect(() => {
    if (!socket) {
      console.error("Socket is not initialized!");
      return;
    }
    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
      setIsConnected(true);
    });

    socket.on("receive-message", (data) => {
      setMessageData((prev) => [
        ...prev,
        {
          text: data.messageInput,
          isOwnMessage: false,
          time: moment().format("HH:mm"),
        },
      ]);
    });

    socket.on("user-feedback", (data) => {
      setFeedback(data.feedback || "");
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected");
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messageData]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleTypingFeedback = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socket.emit("feedback", { feedback: "Typing" });

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("feedback", { feedback: "" });
    }, 2000);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const data = {
      receiver_id: id,
      sender_id: senderid,
      messageInput: message,
    };
    socket.emit("message", data);
    setMessageData((prev) => [
      ...prev,
      { text: message, isOwnMessage: true, time: moment().format("HH:mm") },
    ]);
    setMessage("");
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
              <Text style={styles.UserText}>{userName}</Text>
              <Text style={styles.onlineText}>
                <View style={styles.OnlineCircle}></View>{" "}
                {feedback ? feedback : "Online"}
              </Text>
            </View>
            <Image style={styles.Avatar} source={profile} />
          </View>
        </View>

        <View style={styles.messageContainer}>
          <ScrollView ref={scrollViewRef}>
            {messageData.map((msg, index) => (
              <View
                key={index}
                style={
                  msg.isOwnMessage ? styles.sentMessage : styles.receivedMessage
                }
              >
                <Text style={styles.msg}>{msg.text}</Text>
                <Text style={styles.msgTime}>{msg.time}</Text>
              </View>
            ))}
          </ScrollView>

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
