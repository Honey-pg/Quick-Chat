import { createContext, useEffect, useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL= backendUrl;

export const authContext = createContext();

export const AuthProvider=({ children })=>{

    const [token, setToken]=useState(localStorage.getItem("token"));
    const [authUser,setAuthUser]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const [socket,setSocket]=useState(null);

    //check user is authenticated or not
    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check");
            if (data?.success) {
                const user = data.user;
                setAuthUser(user);
                connectSocket(user);
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.message);
        }
    }
   //login/signup function to handle user auth
   const login = async (state, credentials) => {
    try {
        const { data } = await axios.post(`/api/auth/${state}`, credentials);
        if (data?.success) {
            // login returns userData, signup returns newUser
            const user = data.userData || data.newUser;
            setAuthUser(user);
            connectSocket(user);
            // Prefer Authorization header; keep legacy 'token' for backend compatibility
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            axios.defaults.headers.common['token'] = data.token;
            setToken(data.token);
            localStorage.setItem('token', data.token);
            toast.success(data.message);
        } else {
            toast.error(data?.message || 'Authentication failed');
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        console.log(error);
    }
   }
 
   //logout function to handle logout
   const logout=async()=>{
     try {
         const {data} = await axios.post('/api/auth/logout');
         if(data.success){
             setAuthUser(null);
             setToken(null);
             localStorage.removeItem('token');
             toast.success(data.message);
             axios.defaults.headers.common['token']='';
             setOnlineUsers([]);
             socket.disconnect();
         }
     } catch (error) {
         toast.error(error.message);
     }
   }

   //update profile function to handle user profile

   const updateProfile = async (body)=>{
    try {
        const {data}=await axios.put("/api/auth/update-profile",body)
        if(data.success){
            setAuthUser(data.user);
            toast.success("Profile Updated Successfully!")
        }
    } catch (error) {
        console.log(error);
        
        toast.error(error.message);
    }
   }

    //connect of socket.io
    const connectSocket = (userData)=>{
        if(!userData || socket?.connected) return;
       const newSocket = io(backendUrl,{
            query:{
                userId:userData._id
            }
        });
        newSocket.connect();
        setSocket(newSocket);
        newSocket.on("getOnlineUsers", (userIds) => {
           setOnlineUsers(userIds);
        })
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["token"] = token;
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        checkAuth();
    }, [])

   const value={
       axios,
       authUser,
       onlineUsers,
       socket,
       login,
       logout,
       updateProfile
   };
    return(
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}

