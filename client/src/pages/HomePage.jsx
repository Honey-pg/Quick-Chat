import React, { useState } from 'react'
import ChatComponents from '../components/ChatComponents'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'


const HomePage = () => {
  const [selecteduser,setselecteduser]=useState(false);

  return (
    <div className='border h-screen w-full sm:px-[15%] sm:py-[5%]'>
      <div className={`border-2 relative backdrop-blur-xl grid grid-cols-1 h-full overflow-hidden border-gray-600 rounded-xl p-4 
        ${selecteduser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2"}`}>
        <Sidebar />
        <ChatComponents />
        <RightSidebar  selecteduser={selecteduser} setselecteduser={setselecteduser}/>
      </div>
    </div>
  )
}

export default HomePage
