import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../src/navigation/Authcontext"; 
import Login from "./login";
import MainContainer from "../src/navigation/MainContainer";
import Register from "./register";
import MessageScreen from "../src/components/messageScreen";
import { useAuthStore } from "../src/store/useAuthstore";
import Loading from "../src/screens/loading";
import VideoChatScreen from "../src/navigation/screens/videochatscreen";
import { useEffect } from "react";
import Document from "../src/navigation/screens/Document";


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { token } = useContext(AuthContext)
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  if(isCheckingAuth && !authUser){
 return <Loading/>
  }

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
      <Stack.Screen name="NewMeet" component={VideoChatScreen} options={{headerShown:false, presentation:'fullScreenModal'}}/>
      <Stack.Screen name="Document" component={Document} options={{headerShown:false}}/>
    </Stack.Navigator>
  );


  return authUser ? <MainStack /> : <AuthStack />;
};

export default StackNavigator;
