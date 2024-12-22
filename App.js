import React,{useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './screens/login';

import Register from './screens/register';
import Otp from "./screens/otp";
import Dashboard from "./screens/dashboard";
import MainContainer from "./src/navigation/MainContainer";
import StackNavigator from "./screens/StackNavigator";
import { AuthProvider } from "./src/navigation/Authcontext";



const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
      <StackNavigator/>
      
      </NavigationContainer>
    
    </AuthProvider>
  );
};

export default App;
