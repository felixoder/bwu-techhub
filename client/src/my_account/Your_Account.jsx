import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";
import { updateStart , updateSuccess , updateFailure , deleteUserStart , deleteUserSuccess , deleteUserFailure , signOutSuccess } from "../redux/user/userSlice.js";
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {Link} from 'react-router-dom';
import toast , {Toaster} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
export default function Your_Account() {
    const { currentUser , error , loading } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false)
    const[updateUserSuccess , setUpdateUserSuccess] = useState(null)
    const [updateUserError , setUpdateUserError] = useState(null)
    const [formData, setFormData] = useState({});
    const [showModel , setShowModel] = useState(false)
    const navigate = useNavigate();
    const filePickerRef = useRef();
    const dispatch = useDispatch()
  
  
  

  
  
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  
  const handleSubmit = async (e) => {
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    e.preventDefault();
   
    if (Object.keys(formData).length === 0) {
     setUpdateUserError('No changes are made')
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload')
      return
    }
   
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message)
        toast.error('Oups The updation is failed...')
     
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('Users profile is updated successfully')
        toast.success('The Updation is successful')
        
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message)
      toast.error('Check Your network connection Buddy')
      
    }
  };
  
  const handleDeleteUser=async ()=>{
    setShowModel(false);
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
  
      })
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
        toast.error('Check Your network connection Buddy')
        
      }
      else{
        dispatch(deleteUserSuccess(data))
        toast.success('Your account is deleted')
        navigate('/')
      }
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
      toast.error('Deletion Failed. Try again later')
      
    }
  
  }
  const handleSignOut = async ()=>{
    try {
      const res = await fetch('/api/user/signout',{
        method:'POST'
  
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);

      }
      else{
        dispatch(signOutSuccess())
        toast.success('You are signed out successfully!')
  
      }
      
    } catch (error) {
      console.log(error.message);
      toast.error('Check Your network connection Buddy')
      
    }
  }
   
  return (

    <div className="max-w-lg mx-auto p-3 w-full">
        <Toaster/>
      <h1 className="my-7 text-center font-semibold text-3xl">🌠Your Profile 🤩</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div
          className=" w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          
        >
        
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />  
        <input
          type="text"
          id="department"
          placeholder="Your Department (eg: CSE-AIML)"
          defaultValue={currentUser.department || 'None'}
          required='true'
          onChange={handleChange}
        /><input
          type="text"
          id="student_code"
          placeholder="Your Student Code (eg: BWU/BTA/22/157)"
          defaultValue={currentUser.student_code || 'None'}
          required='true'
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
     
          onChange={handleChange}
        />
        <button type="submit" className=" h-[40px] rounded-md hover:bg-blue-800 text-white bg-pink-400 w-full" outline disabled={loading || imageFileUploading}>
          {loading ? 'Loading...':'Update'}
        </button>
       
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModel(true)} className="cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="cursor-pointer">Sign-Out</span>
      </div>
      
      <Modal show={showModel} onClose={()=> setShowModel(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
            <h3 className="mb-5 text-lg text-grey-500 dark:text-grey-400">Are You sure you want to delete your account</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>Yes I am sure</Button>
              <Button color="grey" onClick={()=> setShowModel(false)}>No, Cancel </Button>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  )
}
