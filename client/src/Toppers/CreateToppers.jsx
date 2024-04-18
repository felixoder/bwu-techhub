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

export default function CreateToppers() {
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
        setImageUploadError("Please Select a Image");
        toast.error("No Image uploaded");
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
              setFormData({ ...formData, img: downloadURL });
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
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        author: currentUser.username,
      };

      const res = await fetch("/api/topper/add-topper", {
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
        toast.success("Topper is uploaded successfully");
        navigate(`/topper/${data.slug}`);
      }
    } catch (err) {
      setPublishError(err.message);
      toast.error("Oops! The Topper was not uploaded");
    }
  };

  return (
    <div className="">
      <Toaster />
      <h1 className="text-center font-bold text-3xl mb-3 mt-3">
        Add Toppers
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[350px] gap-2  mx-auto"
      >
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, f_name: e.target.value })}
          className="rounded sm w-[200px]"
          name="f_name"
          id="f_name"
          placeholder="Name of the Toppers"
        />
         <select
                    className='w-[200px]'
                    id='department'
                    name='department'
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >  <option value=''>Choose the Department</option>
                    <option value='CSE-CORE'>CSE-CORE</option>
                    <option value='CSE-AIML'>CSE-AIML</option>
                    <option value='CSE-DS'>CSE-DS</option>
                    <option value='CSE-Diploma'>CSE-Diploma</option>
                  

                    

                     
                    
                
                </select>

        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, package: e.target.value })}
          name="package"
          id="package"
          className="rounded sm"
          placeholder="Enter the Package(in CTC) [ In LPA ]"
        />
     <input
          type="text"
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          name="company"
          id="company"
          className="rounded sm"
          placeholder="Enter the Name of the company"
        /><input
          type="text"
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          name="position"
          id="position"
          className="rounded sm"
          placeholder="Enter the Job Role"
        /><input
          type="text"
          onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
          name="feedback"
          id="feedback"
          className="rounded sm"
          placeholder="What the star say about our Department"
        />
     
      
        <Label>Choose Image *Only Image under 2 MB is supported</Label>
        <div className="flex gap-2">
          <FileInput
          
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
          
            type="button"
            gradientDuoTone="purpleToPink"
            outline
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
              "Upload Image of the student"
            )}
          </Button>
        </div>
      
        {formData.img && (
          <img
            src={formData.img}
            alt="upload"
            className="w-72 h-72 object-cover mx-auto"
          />
        )}
        <button
          className=" mb-3 bg-blue-800 text-white rounded-md font-semibold h-[50px]"
          
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
