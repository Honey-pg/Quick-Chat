import React, { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom";
import avatar_icon from '../assets/avatar_icon.png';
import logo_icon from '../assets/logo_icon.svg';
import { authContext } from '../../context/authContext';
const ProfilePage = () => {
  
  const {authUser, updateProfile}=useContext(authContext);

    const navigate = useNavigate();
    const [name,setname] = useState(authUser.fullName);
    const [selectedimg,setselectedimg]=useState("");
    const [bio,setbio]=useState(authUser.bio);

    const handleFormSubmit= async (e)=>{
        e.preventDefault();

        if(!selectedimg){
            await updateProfile({fullName:name,bio})
            navigate('/');
            return;
        }
        const reader=new FileReader();
        reader.readAsDataURL(selectedimg);
        reader.onload= async ()=>{
          const base64Img=reader.result;
            await updateProfile({fullName:name,bio,profilePic:base64Img});
            navigate('/');
        }

    }
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600
      flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-5 flex-1 p-10' > 
            <h3 className='text-lg'> Profile Details</h3>
            <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=>{setselectedimg(e.target.files[0])}} type="file" id='avatar' accept='.png , .jpg, .jpeg' hidden />

            <img src={selectedimg? URL.createObjectURL(selectedimg): avatar_icon} alt="" 
        className={`w-12 h-12 ${(selectedimg?"rounded-full":"")}}`}/>
            Upload Profile Image 
            </label>
            <input onChange={(e)=>{setname(e.target.value)}} value={name} type="text" required placeholder='Your name' className='p-2 border 
            border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' />
          <textarea onChange={(e)=>{setbio(e.target.value)}} value={bio}
          className='p-2 border border-gray-500 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-violet-500' rows={4} placeholder='Write profile bio' required></textarea>
          <button type='submit' className='bg-gradient-to-r from-purple-800 to-violet-500
           text-white p-2 rounded-full text-lg cursor-pointer'>Save</button>
        </form>
        <img className={`max-w-39 aspect-square rounded-full mx-10 max-sm:mt-10 ${(selectedimg?"rounded-full":"")}`} src={ authUser?.profilePic||logo_icon}/>
      </div>
    </div>
  )
}

export default ProfilePage
