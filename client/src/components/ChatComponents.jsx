import React, {  useContext, useEffect, useRef, useState } from 'react'
import arrow_icon from '../assets/arrow_icon.png'
import help_icon from '../assets/help_icon.png'
import logo_icon from '../assets/logo_icon.svg'
// import messages from '../assets/messages'
import avatar_icon from '../assets/avatar_icon.png'
import formatMessageTime from '../lib/utils'
import gallery_icon from '../assets/gallery_icon.svg'
import send_button from '../assets/send_button.svg'
import { authContext } from '../../context/authContext'
import { chatContext } from '../../context/chatContext'
import {toast} from "react-hot-toast";


const ChatComponents = () => {
  const {authUser,onlineUsers}=useContext(authContext);
  const { messages,sendMessage, selecteduser,setselecteduser,getmessages}=useContext(chatContext);

  const [input,setinput]=useState('');

  const scrollEnd=useRef();
  
  const handleSendMessage= async () =>{

   if(input.trim()==="") return null;
   await sendMessage({text:input.trim()});
   setinput('');
  }
 //handle send image
 const handleSendImage= async (event)=>{
  const file=event.target.files[0];
  if(!file || !file.type.startsWith('image/')){
    toast.error("select an Image")
     return;
    }
   const reader=new FileReader();
    reader.onloadend=async (event)=>{
    await sendMessage({image:reader.result});
    event.target.value="";
  };
  reader.readAsDataURL(file);
 }
  useEffect(()=>{
    if(selecteduser){
      getmessages(selecteduser._id);
    }},[selecteduser])


  useEffect(()=>{
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView({behavior:'smooth'})
    }
 },[messages])

  return selecteduser? (
    <div className='h-full backdrop-blur-lg relative overflow-scroll'>
       <div className='flex items-center gap-3 py-3 mx-4 border-stone-500 border-b'>
        <img src={ selecteduser.profilepic || avatar_icon} alt="Profile" className='w-8 rounded-full'/>
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selecteduser.fullName}
          {onlineUsers.includes(selecteduser._id) && <span className='w-2 h-2 rounded-full bg-green-500'></span>} 
        </p>
         <img onClick={()=>setselecteduser(null)} src={arrow_icon} alt="" className='md:hidden max-w-7' />
          <img src={help_icon} alt="" className='md:hidden max-w-5' />
       </div>
       {/* chat area */}
       <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6' >
        {messages.map((msg,index)=>(
          <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex flex-row-reverse'}`}>
           {msg.image?(
            <img src={msg.image} className='border border-gray-700 max-w-[230px] rounded-lg overflow-hidden mb-8'/>
           ):(
            <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId===authUser._id? 'rounded-br-none':'rounded-bl-none'}}`}>{msg.text}</p>
           )}
           <div className='text-center text-xs'>
            <img src={msg.senderId=== authUser._id? authUser?.profilepic || avatar_icon : selecteduser?.profilepic || avatar_icon} alt="" className='w-7 rounded-full '/>
            <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
           </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
       </div>
       {/* bottom area */}
       <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input onChange={(e)=>{setinput(e.target.value)}} value={input} onKeyDown={(e)=>{
            e.key==="Enter"? handleSendMessage(e):null; }} type="text" placeholder='Send a Message' className='flex-1 border-none
           outline-none rounded-lg text-sm p-3 placeholder-gray-400'/>
          <input onClick={(e)=>handleSendImage(e)} type="file" id="image" accept='image/png , image/jpeg'  hidden/>
          <label htmlFor="image">
            <img src={gallery_icon} alt="" className='w-5 mr-2 cursor-pointer'/>
          </label>
        </div>
         <img onClick={()=>handleSendMessage()} src={send_button} alt="" className='w-7 cursor-pointer'/>
       </div>

    </div>
  ):(
    <div className='flex flex-col gap-2 text-gray-500 bg-white/10 justify-center items-center max-md:hidden'>
      <img src={logo_icon} alt="" className='max-w-16' />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere! </p>
    </div>
  )
}

export default ChatComponents
