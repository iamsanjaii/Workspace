import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import { Alert } from "react-native";
import { io } from "socket.io-client";

const BASE_URL="http://localhost:4700"
export const useAuthStore = create((set, get)=>({
authUser:null,
isCheckingAuth: true,
isSigningUp:false,
isLogginIn:false,
onlineUsers:[],
isUpdatingProfile:false,
isLoading: false,
documentChanges:[],
socket:null,
checkAuth: async()=>{
    try {
        const res = await axiosInstance.get('/auth/check')
        set({authUser:res.data})
        get().connectSocket()
    } catch (error) {
        set({authUser:null})
        console.log("Error in CheckAuth:", error)
    }finally{
        set({isCheckingAuth:false})
    }
},
signup: async(data)=>{
set({isSigningUp:true});
try {
   const res =  await axiosInstance.post('/auth/signup', data)
   set({authUser: res.data})
        Alert.alert("Registered Successfully");
        get().connectSocket()
       
} catch (error) {
    Alert.alert(error)
}finally{
    set({isSigningUp:false})
}
},

logout: async(data)=>{
try {
await axiosInstance.post('/auth/logout')
set({authUser:null});
get().disconnectSocket()
Alert.alert("logged Out Successfully")
} catch (error) {
    console.log("Error ", error)
}
},

login: async(data)=>{
    set({isLogginIn:true})
    try {
        const res = await axiosInstance.post('/auth/login',data)
        set({authUser: res.data})
        get().connectSocket()
    } catch (err) {
        set({authUser:null})
        console.log("Error in Login", err)
    }finally{
        set({isLogginIn:false})
    }
},

updateProfile: async(data)=>{
    set({isUpdatingProfile:true})
    try {
        const res = await axiosInstance.put('/auth/update-profile', data)
        set({authUser:res.data})
        Alert.alert('Profile Updated Successfully')
    } catch (error) {
        console.log("Error in Uploading Profile", error)
        Alert.alert(error.response.data.message)
        
    }finally{
        set({isUpdatingProfile:false})
    }

},
connectSocket: ()=>{
    const {authUser} = get()
    if(!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL,{
        query:{
            userId: authUser._id
        }
    })
    socket.connect()
    set({socket:socket})
    socket.on('getOnlineUsers', (userIds)=>{
set({onlineUsers: userIds})
    })
    socket.on('document-saved', (data)=>{
        set({documentChanges: data})
    })

},
disconnectSocket: ()=>{
if(get().socket?.connected) get().socket.disconnect();
}

}))

