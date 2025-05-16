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
              At Legalnable, we believe that everyone deserves equal access to justice—no matter their abilities. We specialize in bridging the gap between complex legal systems and the real-life challenges faced by people with disabilities. Our unique blend of legal expertise, compassionate advocacy, and community-driven support empowers individuals to understand, claim, and protect their rights confidently.
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