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

export default function CreateHackathons() {
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

      const res = await fetch("/api/hack/create-hack", {
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
        toast.success("PYQ is uploaded successfully");
        navigate(`/hack/${data.slug}`);
      }
    } catch (err) {
      setPublishError(err.message);
      toast.error("Oops! The PYQ was not uploaded");
    }
  };

  return (
    <div className="">
      <Toaster />
      <h1 className="text-center font-bold text-3xl mb-3 mt-3">
        Create Hackathons
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
          placeholder="Name of Hackathons"
        />
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          name="desc"
          id="desc"
          className="rounded sm"
          placeholder="About the hackathons"
        />
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, teams: e.target.value })}
          name="teams"
          id="teams"
          className="rounded sm"
          placeholder="Details of Team"
        />
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
          name="fee"
          id="fee"
          className="rounded sm"
          placeholder="Entry Fee"
        />
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
          name="skill"
          id="skill"
          className="rounded sm"
          placeholder="Skillset required"
        />
        <input
          type="date"
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          name="date"
          id="date"
          className="rounded sm"
          placeholder="The date of the Hackathon"
        />
        <Label>Choose Docs *Only PDF under 2 MB is supported</Label>
        <div className="flex gap-2">
          <FileInput
            
            type="pdf"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="button"
            className="bg-pink-700 text-white font-semibold rounded-md"
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
              "Upload PDF"
            )}
          </button>
        </div>
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, reg: e.target.value })}
          name="reg-form"
          id="reg-form"
          className="rounded sm"
          placeholder="Registration Form"
        />
        {formData.pdf && (
          <embed
            src={formData.pdf}
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
