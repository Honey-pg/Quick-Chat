import {createContext, useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import { authContext } from "./authContext";

export const chatContext = createContext();

export const ChatProvider = ({children}) => {
    
    const [messages,setmessages]=useState([]);
    const [selecteduser,setselecteduser] = useState(null);  
    const [users,setusers]=useState([]); 
    const [unseenmessages,setunseenmessages]=useState({});
    
    const {socket,axios}=useContext(authContext);

    //function to get all users for sidebar
    const getUsers=async()=>{
        try{
            const {data} = await axios.get("/api/messages/users");

            if(data.success){
                setusers(data.users);
                setunseenmessages(data.unseenMessages);
            }
            console.log(data.users);
        }catch(err){
            toast.error("Error in getting users");
            console.log(err.message)
        }
    }

    //function to get messages between two users
    const getmessages=async(userId)=>{
        try{
            const {data} = await axios.get(`/api/messages/${userId}`)
            if(data.success){
                setmessages(data.messages);
            }
        }catch(err){
            toast.error("Error in getting messages");
            console.log(err.message)
        }
    }

    // function to send message
    const sendMessage = async (text) => {
        try {
            if (!selecteduser?._id) {
                toast.error("No user selected");
                return;
            }
            const { data } = await axios.post(`/api/messages/send/${selecteduser._id}`, text );
            if (data?.success && data?.message) {
                setmessages((prev) => [...prev, data.message]);
            } else {
                toast.error(data?.message || "Message not sent");
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message);
            console.log(error);
        }
    }
    
    //function to subscribe to socket events
    const subscribeToMessage=()=>{
        if(!socket) return;

        socket.on("newMessage",(newMessage)=>{
            if(selecteduser && selecteduser._id === newMessage.senderId){
                selecteduser.seen=true;
                setmessages(prev=>[...prev,newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`,newMessage);
            }else{
                setunseenmessages((prev)=>({...prev,[newMessage.senderId]: prev[newMessage.senderId]?prev[newMessage.senderId]+1:1}))
            }
        })
    }

    //function to unsubscribe from socket events
    const unsubscribeFromMessage=()=>{
        if(socket) socket.off("newMessage");
    }   

    useEffect(()=>{
        subscribeToMessage();
        return ()=>{
            unsubscribeFromMessage();
        };
    },[socket,selecteduser])


    const value = {
     messages,
     users,
     getUsers,
     selecteduser,
     sendMessage,
     setselecteduser,
     unseenmessages,
     setunseenmessages,
     getmessages
    }

    return (
        <chatContext.Provider value={value}>
            {children}
        </chatContext.Provider>
    )
}