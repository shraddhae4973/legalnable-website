import React, { useEffect } from "react";
import './footer.css';
import { GoLaw } from "react-icons/go";
import { ImFacebook } from "react-icons/im";
import { BsLinkedin } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import Aos from 'aos';
import 'aos/dist/aos.css';


const Footer = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <div className="footer">
      <div className="secContainer container grid">
        <div data-aos="fade-up" data-aos-duration="2000"className="logoDiv">
          <div data-aos="fade-up" data-aos-duration="2000"className="footerLogo">
            <a href="#" className="logo flex">
              <h1 className="flex">
                <GoLaw className="icon" />
                Legalnable</h1>
            </a>
          </div>

          <div data-aos="fade-up" data-aos-duration="3000"className="socials flex">
            <ImFacebook className="icon" />
            <BsInstagram className="icon" />
            <BsLinkedin className="icon" />
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="3000" className="footerLinks">
          <span className="linkTitle">
            Information
          </span>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Events</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <span className="phone">+32 32323222</span>
          <span className="phone">legalnable@gmail.com</span>

        </div>

        <div data-aos="fade-up" data-aos-duration="4000" className="footerLinks">
          <span className="linkTitle">
            Helpful Links
          </span>
          <li>
            <a href="#">FAQs</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Resources</a>
          </li>
          <li>
            <a href="#">Legal Aid</a>
          </li>
          <span className="phone">+32 32323222</span>
          <span className="phone">legalnable@gmail.com</span>

        </div>

        <div data-aos="fade-up" data-aos-duration="5000"className="footerLinks">
          <span className="linkTitle">
            Contact Us
          </span>
          <span className="phone">+32 32323222</span>
          <span className="phone">legalnable@gmail.com</span>
        </div>
      </div>
    </div>
  )
}

export default Footer