import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import SignIn from "./Authentication/SignIn.jsx";
import Main from "./components/Main.jsx";
import About from "./Department/About.jsx";
import FooterCom from "./components/Footer.jsx";
import Your_Account from "./my_account/Your_Account.jsx";
import PrivateRoute from "./private_routes/PrivateRoute.jsx";
import Profile from "./my_account/Profile.jsx";
import OnlyAdminPrivateRoute from "./private_routes/OnlyAdminPrivateRoute.jsx";
import { useSelector } from "react-redux";
import CreateHackathons from "./hackathons/CreateHackathons.jsx";
import ViewHackathons from "./hackathons/ViewHackathons.jsx";
import HackPage from "./hackathons/HackPage.jsx";
import CreateEvents from "./events/CreateEvents.jsx";
import ViewEvents from "./events/ViewEvents.jsx";
import EventsPage from "./events/EventsPage.jsx";
import CreateNewsLetter from "./newsletters/CreateNewsLetter.jsx";
import ViewNewsLetter from "./newsletters/ViewNewsLetter.jsx";
import NewsLetterPage from "./newsletters/NewsLetterPage.jsx";
import CreateToppers from "./Toppers/CreateToppers.jsx";
import Topper from "./Toppers/Topper.jsx";
import CreateFeedback from "./feedback/CreateFeedback.jsx";
import ViewFeedback from "./feedback/ViewFeedback.jsx";
import Message from "./messages/Message.jsx";
import { FaRegMessage } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti"

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <>
      <Header />
      <Routes>
        {/* Routes for public pages */}
        <Route path="/" element={<Main />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about-university" element={<About />} />
        <Route path="/topper/:postslug" element={<Topper />} />

        {/* Private routes (accessible only to logged-in users) */}
        <Route element={<PrivateRoute />}>
          <Route path="/update" element={<Your_Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-hackathons" element={<ViewHackathons />} />
          <Route path="/view-events" element={<ViewEvents />} />
          <Route path="/view-newsletters" element={<ViewNewsLetter />} />
          <Route path="/hack/:postslug" element={<HackPage />} />
          <Route path="/event/:postslug" element={<EventsPage />} />
          <Route path="/newsletters/:postslug" element={<NewsLetterPage />} />
          <Route path="/create-feedback" element={<CreateFeedback />} />
          <Route path="/view-feedback" element={<ViewFeedback />} />
        </Route>

        {/* Admin-only routes (accessible only to admins) */}
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-hackathons" element={<CreateHackathons />} />
          <Route path="/create-events" element={<CreateEvents />} />
          <Route path="/create-newsletters" element={<CreateNewsLetter />} />
          <Route path="/create-toppers" element={<CreateToppers />} />
        </Route>
      </Routes>

      <FooterCom />

      {/* Display chat icon/button with chat box */}
      {currentUser && (
        <div className="fixed bottom-4 right-4">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded cursor-pointer shadow ${
              chatOpen ? "rounded-t-lg" : "rounded-t-lg"
            }`}
            onClick={toggleChat}
          >
            {chatOpen ? <TiArrowSortedDown className="text-3xl cursor-pointer" /> : <FaRegMessage className="text-2xl cursor-pointer"/>}
          </button>
          {chatOpen && (
            <div className="bg-white fixed bottom-16 right-4 p-4 rounded-lg shadow-md h-[400px] w-[200px] md:w-[400px]">
              <Message className='bg-blue-500 text-white'/>
            </div>
          )}
        </div>
      )}
    </>
  );
}
