import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Otp = ({route}) => {
    const navigation = useNavigation()
  const inputRefs = useRef([]);
  const {email} = route.params;
  

  const handleInputChange = (text, index) => {
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.OTPtextContainer}>
          <Text style={styles.OTPtext}>Enter OTP</Text>
          <Text style={styles.otpNumber}>
          An OTP has been Sent to {email}
          </Text>
        </View>

        <View style={styles.OTPContainer}>
          {[0, 1, 2, 3].map((_, index) => (
            <TextInput
              key={index}
              style={styles.OTPInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goBack} onPress={()=>{navigation.navigate('Register')}}>
            <Text style={styles.goBackText}> Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: "center",
  },
  OTPtextContainer: {
    textAlign: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  OTPtext: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  otpNumber: {
    textAlign: "center",
    color: "#7C808D",
    fontSize: 16,
  },
  OTPContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  OTPInput: {
     
   borderWidth:2,
   borderColor:'#000',
    fontSize: 18,
    textAlign: "center",
    height:50,
borderRadius: 8,
    paddingHorizontal: 10,
    width: 50,
  },
  submitButton:{
    backgroundColor: "#000000",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,

  },
  submitButtonText:{
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  goBack:{

   marginTop:40,
  },
  goBackText:{
    color: "#7C808D",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  }
});

export default Otp;
