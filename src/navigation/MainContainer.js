import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/homeScreen';
import SettingScreen from './screens/settings';
import ChatScreen from './screens/chatScreen';
import MeetScreen from './screens/meetScreen';
import MessageScreen from '../components/messageScreen';
import Newmessage from './screens/Newmessage';

const homeName = "Home";
const settingsName = "Settings";
const chatName = "Chat"
const meetName = "Meet"
const Message = "Message"
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ChatStack = () => {
  return (
      <Stack.Navigator>
     
          <Stack.Screen 
              name="Chat" 
              component={ChatScreen} 
              options={{ headerShown: false }} 
          />
          
          <Stack.Screen 
              name="Message" 
              component={MessageScreen} 
              options={{ headerShown: false, presentation:'fullScreenModal'}} 
          />
          <Stack.Screen name="NewMessage" component={Newmessage} options={{headerShown:false, presentation:'fullScreenModal'}}/>
      </Stack.Navigator>
  );
};

export default function MainContainer() {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (rn === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                } else if (rn === 'Chat') {
                    iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                } else if (rn === 'Meet') {
                    iconName = focused ? 'videocam' : 'videocam-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#5553FC',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: {
                paddingBottom: 10,
                fontSize: 10,
            },
            tabBarStyle: {
                paddingTop: 10,
                height: 70,
                borderRadius: 30,
                backgroundColor: '#ffffff',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                elevation: 5,
            },
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Chat" component={ChatStack} options={{ headerShown: false }} />
        <Tab.Screen name="Meet" component={MeetScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
);
}

