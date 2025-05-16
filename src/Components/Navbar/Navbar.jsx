import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './navbar.css';
import { GoLaw } from "react-icons/go";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-scroll";

const Navbar = () => {
  const navigate = useNavigate();

  //code to toggle/show navbar
  const [active, setActive] = useState('navBar')

  const showNav = () => {
    setActive('navBar activeNavbar')
  }

  //  code to remoe navbar
  const removeNav = () => {
    setActive('navBar')
  }

  //code to add backgeround color to the header
  const [transparent, setTransparent] = useState('header')
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent('header activeHeader')
    } else {
      setTransparent('header')
    }
  }
  window.addEventListener('scroll', addBg)

  return (
    <section className='navBarSection'>
      <div className={transparent}>
        <div className="logoDiv">
          <a href="#" className="logo">
            <h1 className="flex">
              <GoLaw className="icon" />Legalnable</h1>
          </a>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="home" className="navLink" smooth={true} duration={500}>Home</Link>
            </li>
            <li className="navItem">
              <Link to="event" className="navLink" smooth={true} duration={500}>Event</Link>
            </li>
            <li className="navItem">
              <Link to="offer" className="navLink" smooth={true} duration={500}>Offers</Link>
            </li>

            <li className="navItem">
              <Link to="about" className="navLink" smooth={true} duration={500}>About</Link>
            </li>
            <li className="navItem">
              <Link to="blog" className="navLink" smooth={true} duration={500}>Blog</Link>
            </li>
            
            <div className="headerBtns flex">
             
              <button onClick={() => navigate("/admin")} className="btn loginBtn">
                <a href="#">Dashboard</a>
              </button>
             
            </div>

          </ul>
          <div onClick={removeNav} className="closeNavbar">
            <IoMdCloseCircleOutline className="icon" />
          </div>
        </div>

        <div onClick={showNav}
          className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </div>

    </section>
  )
}

export default Navbar