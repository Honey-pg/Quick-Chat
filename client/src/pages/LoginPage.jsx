import React, { useContext, useState } from 'react'
import logobig from '../assets/logo_big.svg'
import arrowicon from '../assets/arrow_icon.png'
import { authContext } from '../../context/authContext'
const LoginPage = () => {
  const [currState,setcurrentState]=useState('Sign up')
  const [fullName,setfullName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [bio,setbio]=useState('')
  const [isdatasubmitted,setisdatasubmitted]=useState(false)  

  const {login}=useContext(authContext);
   
  const onSubmitHandler=(event)=>{
    event.preventDefault()
    if(currState==='Sign up' && !isdatasubmitted){
      console.log(fullName,email,password,bio)
      setisdatasubmitted(true)
      return;
    }

    login(currState==="Sign up"?'signup':'login' ,{
      fullName,email,password,bio });
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-cover bg-center
     gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      <img src={logobig} alt="" className='w-[min(30vw,250px)]' />
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex
      flex-col rounded-lg gap-6 shadow-lg'>
       <h2 className='font-medium text-2xl flex justify-between items-center'>
       {currState}
       {isdatasubmitted && <img onClick={()=>{setisdatasubmitted(false)}} src={arrowicon} alt="" className='w-5 cursor-pointer'/>}
       
       </h2>

       {currState==='Sign up' && !isdatasubmitted && (
          <input onChange={(e)=>setfullName(e.target.value)} value={fullName} type="text" className='p-2 border border-gray-500 rounded-md
      focus:outline-none' placeholder='Full Name' required />
       )}
      {!isdatasubmitted &&(
       <>
       <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' required className='
       p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
       <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className='
       p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>

       </>
      )}
      {
        currState==="Sign up" && isdatasubmitted && (<textarea onChange={(e)=>setbio(e.target.value)} value={bio} rows={4}
        className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Bio'></textarea>)        
      }
      <button type='submit' className='py-3 bg-gradient-to-r from-purple-900 to-violet-600
       text-white rounded-md cursor-pointer'>
        {currState==='Sign up'? "Create Account":'Login Now'}
      </button>
      <div className='flex items-center gap-2 text-sm text-gray-500'>
        <input type="checkbox" />
        <p>Agree to the terms of use & privacy policy.</p>
      </div>
      <div className='flex flex-col gap-2'>
        {currState==='Sign up'?(
          <p className='text-gray-600 text-sm'>Already have an account?
           <span onClick={()=>{setcurrentState("Login"); setisdatasubmitted(false);}} className='font-medium text-violet-500 cursor-pointer'>Login here</span>
          </p>
        ):(
          <p className='text-gray-600 text-sm'>Create an account
          <span className='font-medium text-violet-500 cursor-pointer' onClick={()=>{setcurrentState("Sign up")}}>Click here</span></p>
          
        )}
      </div>
      </form>
    </div>
  )
}

export default LoginPage
