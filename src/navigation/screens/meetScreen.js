import React from 'react';
import { StyleSheet, View,Text, SafeAreaView ,TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MeetScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Meet Screen</Text>
            
        </View>

              <TouchableOpacity
                        style={styles.floatingButton}
                     
                    >
                        <Icon name="add" size={30} color="#fff" />
                    </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
})

export default MeetScreen;
