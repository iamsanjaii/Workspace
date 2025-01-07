import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, Alert } from "react-native";
import defaultImage from "../../../assets/user.png";
import Card from "../../components/Card";
import { useAuthStore } from "../../store/useAuthstore";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { format } from "date-fns";



const SettingScreen = () => {
  const { logout, authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission to access media library is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedUri = result.assets[0].uri;
        setSelectedImage(selectedUri);
        
        // Convert the image to base64 if needed
        const base64Image = await FileSystem.readAsStringAsync(selectedUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await updateProfile({ profilePic: base64Image });
        Alert.alert("Profile picture updated successfully!");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("An error occurred while picking the image.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.cardContainer}>
        <View style={styles.userProfile}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage }
                  : authUser.profilePic
                  ? { uri: authUser.profilePic }
                  : defaultImage
              }
              style={styles.profileImage}
            />

            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={handleImageUpload}
              disabled={isUpdatingProfile}
            >
              <MaterialIcons name="photo-camera" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileText}>{authUser.fullName}</Text>
        </View>

        <Card name={authUser.fullName} since={format(new Date(authUser.createdAt), "MMMM dd, yyyy")} />

        <TouchableOpacity onPress={logout} style={styles.LogoutButton}>
          <Text style={styles.LogoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  userProfile: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#5553FC",
    borderRadius: 15,
    padding: 4,
  },
  LogoutButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  LogoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileText: {
    fontSize: 20,
    color: "#5553FC",
    fontWeight: "700",
    textAlign: "center",
  },
});

export default SettingScreen;
