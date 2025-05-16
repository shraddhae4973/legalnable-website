import React, {useEffect} from "react";
import './about.css'; 
import img from '../../Assets/3.jpg'
import video from '../../Assets/video.mp4'
import Aos from 'aos';
import 'aos/dist/aos.css';


const About = () => {
    useEffect(() =>{
      Aos.init({duration: 2000})
    }, [])
  return (
    <section className="about section">
      <div className="secContainer">
        <h2 data-aos="fade-up" data-aos-duration="2000" className="title">
          Why Legalnable??
        </h2>

        <div className="mainContent container grid">
          <div data-aos="fade-up" data-aos-duration="2000"  className="singleItem">
            <img src={img} alt="Image Name"/>
            <h3>Accessible Legal Support</h3>
            <p>
            We make law easy to understand and navigate.
            </p>

          </div>

          <div data-aos="fade-up" data-aos-duration="2000" className="singleItem">
            <img src={img} alt="Image Name"/>
            <h3>Tailored Disability Advocacy</h3>
            <p>
            Focused on the specific needs and rights of disabled people.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-duration="2000" className="singleItem">
            <img src={img} alt="Image Name"/>
            <h3>Community-Centered Approach</h3>
            <p>
            We listen, involve, and uplift the voices of those we serve.
            </p>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="2000" className="videoCard container">
          <div className="cardContent grid">
            <div data-aos="fade-right" data-aos-duration="2000" className="cardText">
              <h2>Wonderful experience</h2>
              <p>
              Hello, I'm sharing a clean and responsive react Travel and Stay Website to you. 
              </p>
            </div> 
       
          <div data-aos="fade-left" data-aos-duration="2000" className="cardVideo">
            <video src={video} autoPlay loop muted type="video/mp4"></video>
          </div>
          </div>

        </div>
      </div>
    </section>
   
  )
}

export default About