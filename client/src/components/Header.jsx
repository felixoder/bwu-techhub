import React, { useState } from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice.js";
import toast, { Toaster } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import DashSidebar from "../Dashboard/DashSideBar.jsx";
import { FaTimes } from "react-icons/fa";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [openBar, setOpenBar] = useState(false);

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        toast.success("You are signed out successfully!");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Check Your network connection Buddy");
    }
  };

  const toggleSidebar = () => {
    setOpenBar(!openBar); // Toggle the value of openBar state
  };

  return (
    <nav className="sticky top-0">
      <Navbar className="bg-gray-100 border-b-2">
        <Toaster />
<div className="flex gap-3">
  {currentUser && (
    <>
    
    {openBar ? (
      <FaTimes className=" cursor-pointer text-2xl"  onClick={toggleSidebar} />
    ) : (
      <GiHamburgerMenu className=" cursor-pointer text-2xl"  onClick={toggleSidebar} />
    )}
    </>

  )}


        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            BWU-CSE
          </span>
          TechHub
        </Link>
</div>
        <div className="flex gap-2">
          <Link to="/about-university">
            <Button outline gradientDuoTone="purpleToPink">
              Our-Department
            </Button>
          </Link>
          {currentUser ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
                className="z-1000"
              >
                <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                  <span className="block text-sm font-medium truncate text-blue-800">
                    {currentUser.student_code || "nill"}
                  </span>
                  <span className="block text-sm font-medium truncate text-green-800">
                    {currentUser.department || "nill"}
                  </span>
                </Dropdown.Header>
                <Link to={"/profile"}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />

                <span onClick={handleSignOut} className="cursor-pointer ml-3 border-b-black">
                  Sign-Out
                </span>

                <Dropdown.Divider />
               
                
              </Dropdown>
              
            </>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Join-Us
              </Button>
            </Link>
          )}
        </div>
      </Navbar>
      {openBar && (
        <div className="">
          {/* Sidebar */}
          <DashSidebar />
        </div>
      )}
    </nav>
  );
}
