import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../src/navigation/Authcontext"; 
import Login from "./login";
import MainContainer from "../src/navigation/MainContainer";
import Register from "./register";
import MessageScreen from "../src/components/messageScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { token } = useContext(AuthContext)

  const AuthStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  );


  const MainStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainContainer} options={{ headerShown: false }} />
      <Stack.Screen name="Message" component={MessageScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );


  return token ? <MainStack /> : <AuthStack />;
};

export default StackNavigator;
