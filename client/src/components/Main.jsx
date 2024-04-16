import React from 'react'
import DashSidebar from '../Dashboard/DashSideBar'
import { useSelector } from 'react-redux'
export default function Main() {
  const {currentUser} = useSelector ((state)=> state.user);
  return (
    <div className=''>
    <h1 className='font-bold text-3xl text-center'>Welcome to Brainware University</h1>
 
    
    
  </div>
  )
}
