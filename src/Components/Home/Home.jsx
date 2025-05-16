import React, {useEffect} from "react";
import './home.css'; 
import Aos from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

  useEffect(() =>{
    Aos.init({duration: 2000})
  }, [])

  return (
    <section className='home'>
      <div className="secContainer container">
        <div className="homeText">
          <h1 data-aos="fade-up" className="title">
          Welcome to Legalnable 
          </h1>
          <p data-aos="fade-up" data-aos-duration="2500" className="subTitle"> Empowering Through Law & Support
          </p>

          <button data-aos="fade-up" data-aos-duration="3000" className="btn"> 
            <a href="#">Explore now</a>
          </button>
        </div>

        <div className="homeCard grid">
          <div data-aos="fade-right" data-aos-duration="2000"  className="locationDiv">
            <label htmlFor="location">Service Location</label>
            <input type="text" placeholder='Enter city or area'/>
          </div>

          <div data-aos="fade-right" data-aos-duration="2500" className="distDiv">
            <label htmlFor="distance">Support Type</label>
            <input type="text" placeholder='Legal Advice'/>
          </div>

          <div data-aos="fade-right" data-aos-duration="3000" className="priceDiv">
            <label htmlFor="price">Availability</label>
            <input type="text" placeholder='Date & Time'/>
          </div>

          <button data-aos="fade-left" data-aos-duration="2000" className="btn"> Search</button>
        </div>
        </div> 
    </section>
  )
}

export default Home