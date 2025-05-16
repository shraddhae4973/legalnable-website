import React from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./app.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Event from "./Components/Event/Event";
import Offers from "./Components/Offers/Offers";
import About from "./Components/About/About";
import Blog from "./Components/Blog/Blog";
import Footer from "./Components/Footer/Footer";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import Sidebar from "./Components/SideBar/SideBar";
import ContentForm from "./Components/Form/ContentForm";
import EventPage from "./Components/EventPage/EventPage";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <div id="event">
        <Event />
      </div>
      <div id="offers">
        <Offers />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  const location = useLocation(); // Get current page path


  return (
    <>
      {location.pathname.startsWith("/admin") && (
        <div className="admin-container">
          <Sidebar />
          <AdminDashboard />
        </div>
      )}

      {location.pathname.startsWith("/eventPage") && (
        <div className="admin-container">
          <Sidebar />
          <EventPage />
        </div>
      )}

      <Routes>
        <Route path="/" element={<MainLayout />} />
           <Route path="/events/createevent" element={<ContentForm />} />

<Route path="/events/getSingleEvent/:eventId" element={<ContentForm />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
