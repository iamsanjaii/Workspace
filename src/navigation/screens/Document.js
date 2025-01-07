import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, View, Text, TouchableOpacity } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAuthStore } from '../../store/useAuthstore';
import { useNavigation } from '@react-navigation/native';

const Document = () => {
  const richText = React.useRef();
  const {authUser, socket, documentChanges} = useAuthStore()
  const navigation = useNavigation();

  const handleProfilePress = () => {
    console.log("Profile button pressed");
  };
useEffect(()=>{
    console.log(documentChanges)
},[documentChanges])
  const handleDocumentChange = (htmlContent)=>{
if(socket?.connected){
    socket.emit('document-changes', {content: htmlContent})
}
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.DocumentDetalils}>
                     <TouchableOpacity  style={styles.backButton}  onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={30} color="#fff" />
                      </TouchableOpacity>
        <Text style={styles.title}>Untitled <Text style={{ fontSize: 10 }}>.docx</Text></Text>
          <TouchableOpacity onPress={handleProfilePress}>
            <Icon name="account-circle" size={30} color="#fff" />
          </TouchableOpacity>

         
        </View>

        <View style={styles.editorContainer}>
          <RichEditor
            ref={richText}
            style={styles.editor}
            placeholder="Start writing here..."
            onChange={handleDocumentChange}
          />
          <RichToolbar editor={richText} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  editorContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
    color: '#fff',
  },
  editor: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
  },
  DocumentDetalils: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5553FC",
    justifyContent: "space-between",
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default Document;
