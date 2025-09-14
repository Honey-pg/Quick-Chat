import React, {  useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png';
import search_icon from '../assets/search_icon.png';
import menuIcon from '../assets/menu_icon.png';
import { useNavigate } from "react-router-dom";
// import users from "../assets/users";
import avatar_icon from "../assets/avatar_icon.png";
import { authContext } from '../../context/authContext';
import { chatContext } from '../../context/chatContext';

const Sidebar = () => {
  const {getUsers,users,selecteduser,setselecteduser ,unseenmessages,setunseenmessages} = useContext(chatContext);

  const {logout ,onlineUsers}=useContext(authContext);

  const [input,setInput]=useState(false);
  const navigate=useNavigate()
  const filterUsers=input ? users.filter((u)=>u.fullName.toLowerCase().includes(input.toLowerCase())) :users;

  useEffect(()=>{
    getUsers();
  },[onlineUsers])
  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selecteduser ? "max-md:hidden":""}`}>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
        <img src={logo} alt="logo" className='max-w-40' />
        <div className='relative py-2 group'>
          <img src={menuIcon} alt="logo" className='max-h-5 cursor-pointer' />
          <div className='absolute top-full z-0 w-32 right-0 p-5 rounded-md border border-gray-600
            shadow-md bg-[#282142] hidden group-hover:block'>
            <p onClick={()=>navigate('/profile')}className='cursor-pointer text-sm'>Edit Profile</p>
            <hr className='my-2 border-t border-gray-500'/>
            <p onClick={()=>logout()} className='text-sm cursor-pointer'>Logout</p>
          </div>
        </div>
        </div>
        <div className=' w-full rounded-full bg-[#282142] flex items-center gap-2 px-3 py-4 mt-4'>
          <img src={search_icon} alt="Search" className='w-3'/>
          <input onChange={(e)=>{setInput(e.target.value)}} type="text"  className='outline-none bg-transparent border-none text-white
          text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search User...'/>
        </div>
      </div>
      <div className='flex flex-col'>
        {filterUsers?.map((user,index)=>(
          <div onClick={()=>setselecteduser(user)}
           key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm 
           ${selecteduser?._id === user._id && "bg-[#282142]/50 "}`} >
            <img src={user?.avatar || avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full'/>
            <div className='flex flex-col leading-5'>
              <p>{user.fullName}</p>
              {
                onlineUsers.includes(user._id)
                ?<span className='text-green-400 text-xs'>Online</span>
                : <span className='text-neutral-400 text-xs'>Offline</span>
              }
            </div>
               {unseenmessages[user._id]>0 && <p className='absolute top-4 right-4 rounded-full text-xs 
               h-5 w-5 flex justify-center items-center bg-violet-500/50'>{unseenmessages[user._id]}</p>}
          </div>
           
        ))}
      </div>
    </div>
  )
}

export default Sidebar
