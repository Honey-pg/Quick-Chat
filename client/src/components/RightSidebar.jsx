import React, {  useContext, useEffect, useState } from 'react'
import avatar_icon from '../assets/avatar_icon.png'
import imagesdata from '../assets/imagesDummydata'
import { chatContext } from '../../context/chatContext'
import { authContext } from '../../context/authContext'
const RightSidebar = () => {
   const {selecteduser,messages}=useContext(chatContext)
   const {logout,onlineUsers}=useContext(authContext)
   const [msgImages,setmsgImages]=useState([])

   //get all the images of the user
   useEffect(()=>{
    setmsgImages(messages.filter(msg=> msg.image).map(msg=>msg.image))
   },[messages])
  return selecteduser && (
     <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selecteduser ? "max-md:hidden":""}`}>
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selecteduser?.avatar || avatar_icon} alt="" 
        className=' w-20 aspect-[1/1] rounded-full'/>
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          {onlineUsers.includes(selecteduser._id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
          {selecteduser.fullName}</h1>
          <p className='px-10 mx-auto'>{selecteduser.bio}</p>
      </div>
      <hr className='border-[#ffffff50] my-4 mx-2'/>
      <div className='px-5 text-xs'>
          <p>Media</p>
      <div className='mt-2 grid grid-cols-2 gap-4 opacity-80 max-h-[200px] overflow-y-scroll'>
        {msgImages.map((url,index)=>(
          <div keys ={index} onClick={()=> window.open(url)} className='cursor-pointer rounded'>
          <img src={url} alt="" className='h-full rounded-md'/>
          </div>
        ))}
      </div>
    </div>  
    <button onClick={()=>logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-900 to-violet-500 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>Logout</button>
      </div>
    
    )
}

export default RightSidebar
