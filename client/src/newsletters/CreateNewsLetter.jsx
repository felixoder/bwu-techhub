import React, { useState } from "react";
import { FileInput, Button, Label } from "flowbite-react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreateNewsLetter() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    try {
      if (!file) {
        setImageUploadError("Please Select a PDF");
        toast.error("No PDF uploaded");
        return;
      }

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Something went wrong");
          toast.error("Something went wrong");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setImageUploadProgress(null);
              setImageUploadError(null);
              setFormData({ ...formData, pdf: downloadURL });
            })
            .catch((error) => {
              setImageUploadError(
                "Error getting download URL: " + error.message
              );
              toast.error("Error getting download URL: " + error.message);
              setImageUploadProgress(null);
            });
        }
      );
    } catch (err) {
      setImageUploadError("PDF upload failed");
      setImageUploadProgress(null);
      toast.error("PDF upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        author: currentUser.username,
      };

      const res = await fetch("/api/newsletter/create-newsletters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        toast.error(data.message);
      } else {
        setPublishError(null);
        toast.success("NewsLetter is uploaded successfully");
        navigate(`/newsletters/${data.slug}`);
      }
    } catch (err) {
      setPublishError(err.message);
      toast.error("Oops! The NewsLetter was not uploaded");
    }
  };

  return (
    <div className="">
      <Toaster />
      <h1 className="text-center font-bold text-3xl mb-3 mt-3">
        Create NewsLetters
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[350px] gap-2  mx-auto"
      >
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="rounded sm "
          name="title"
          id="title"
          placeholder="Name of NewsLetter"
        />
         <select
                    className='w-[400px]'
                    id='board'
                    name='board'
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                >  <option value=''>Choose the Month</option>
                    <option value='January'>January</option>
                    <option value='February'>February</option>
                    <option value='March'>March</option>
                    <option value='April'>April</option>
                    <option value='May'>May</option>
                    <option value='jun'>Jun</option>
                    <option value='july'>July</option>
                    <option value='August'>August</option>
                    <option value='September'>September</option>
                    <option value='October'>October</option>
                    <option value='November'>November</option>
                    <option value='December'>December</option>

                    

                     
                    
                
                </select>

        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          name="year"
          id="year"
          className="rounded sm"
          placeholder="Enter the Year"
        />
     
      
        <Label>Choose Docs *Only PDF under 2 MB is supported</Label>
        <div className="flex gap-2">
          <FileInput
          className="-z-20"
            type="pdf"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="button"
            className="bg-pink-800 font-semibold text-white rounded-md"
         
            onClick={handleUpload}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload PDF"
            )}
          </button>
        </div>
      
        {formData.pdf && (
          <embed
            src={formData.pdf}
            alt="upload"
            className="w-72 h-72 object-cover mx-auto"
          />
        )}
        <button
 
          className="bg-purple-800 text-white font-semibold h-[30px] rounded-md mb-3"
          
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
