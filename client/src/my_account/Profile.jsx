import React from 'react';
import { useSelector } from 'react-redux';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
    <div className="mx-auto">
    
        <h1 className='text-center font-bold text-3xl mt-3'>Hello {currentUser.username || 'none'}</h1>
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="flex justify-center ">
          <img
            src={currentUser.profilePicture}
            alt={`${currentUser.username}'s avatar`}
            className="rounded-full w-32 h-32 border-4 border-white shadow-lg"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center">{currentUser.username}</h2>
          <p className="text-gray-600 mb-4 text-center">{currentUser.department}</p>
          {currentUser.isAdmin ?(
            <p className="text-red-600 mb-4 text-center">Admin</p>
          ):(
            <p className="text-green-600 mb-4 text-center">Student</p>
          )

          
          }

          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="h-6 w-6 text-gray-400" />
              <span className="text-gray-600">{currentUser.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="h-6 w-6 text-gray-400" />
              <span className="text-gray-600">{currentUser.department}</span>
              <span className="text-gray-600">{currentUser.student_code}</span>
            </div>
          </div>
        </div>
        <div className="mb-3 ml-2 flex justify-center">
          <Link to="/update">
            <Button gradientDuoTone="purpleToPink" outline>
              Update Acount
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </div>
    
    
    </>
  );
}