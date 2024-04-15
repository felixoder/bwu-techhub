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
import { CiChat1 } from "react-icons/ci";
import CreateFeedback from "./feedback/CreateFeedback.jsx";
import ViewFeedback from "./feedback/ViewFeedback.jsx";

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
        <Route path="/" element={<Main />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about-university" element={<About />} />
        <Route path="/topper/:postslug" element={<Topper />} />
        <Route element={<PrivateRoute />}>
          <Route path="/update" element={<Your_Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-hackathons" element={<ViewHackathons />} />
          <Route path="/view-events" element={<ViewEvents />} />
          <Route path="/view-newsletters" element={<ViewNewsLetter />} />
          <Route path="/hack/:postslug" element={<HackPage />} />
          <Route path="/event/:postslug" element={<EventsPage />} />
          <Route path="/newsletters/:postslug" element={<NewsLetterPage />} />
          <Route path='/create-feedback' element={<CreateFeedback/>}/>
          <Route path='/view-feedback' element={<ViewFeedback/>}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="create-hackathons" element={<CreateHackathons />} />
          <Route path="create-events" element={<CreateEvents />} />
          <Route path="create-newsletters" element={<CreateNewsLetter />} />
          <Route path="/create-toppers" element={<CreateToppers />} />
        </Route>
      </Routes>

      <FooterCom />

      {currentUser && (
        <Link
        to="https://mediafiles.botpress.cloud/fffcf09d-cfcb-4dec-a329-bfeb9a7a3a90/webchat/bot.html"
        title="ChatBot"
        target="__blank"
      >
        <div
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer shadow"
         
        >
          Use our own ChatBot
        </div>
      </Link>
        
      )}

     
    </>
  );
}
