import React, { useEffect } from "react";
import './offers.css';
import { GoLaw } from "react-icons/go";
import { IoMdArrowForward } from "react-icons/io";
import img from '../../Assets/1.jpg'
import Aos from 'aos';
import 'aos/dist/aos.css';


const Offer = [
  {
    id: 1,
    imgSrc: img,
    eventTitle: 'Disability rights',
    title1: 'Legal aid',
    grade: 'Legal Support',
    title2:'Form assistance',
    title3:'Rights Guidance',
  },
  {
    id: 2,
    imgSrc: img,
    eventTitle: 'Legal Awareness',
    title1: 'School Outreach',
    grade: 'Educational Workshops',
    title2:'Inclusive Training',
    title3:'Law Literacy',
  },

  {
    id: 3,
    imgSrc: img,
    eventTitle: 'Peer Mentoring',
    title1: 'Community Voices',
    grade: 'Community Advocacy',
    title2:'Awareness Events',
    title3:'Support Circles',
  },

  {
    id: 4,
    imgSrc: img,
    eventTitle: 'Accessible Tech Training',
    title1: 'Digital Legal Resources',
    grade: 'Digital Access & Training',
    title2:'Online Safety for Vulnerable Groups',
    title3:'Website Accessibility Support',
  }
]

const Offers = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return (
    <section className="offer container section">
      <div className="secContainer">
        <div data-aos="fade-up" data-aos-duration="2000" className="secIntro">
          <h2 className="secTitle">
          Our Services
          </h2>
          <p>
          At Legalnable, we offer free and accessible support to help individuals with disabilities understand and protect their legal rights.
          </p>
        </div>

        <div className="mainContent grid">
          {
            Offer.map(({ id, imgSrc, eventTitle, title1, grade, title2, title3 }) => {
              return (
                <div key={id} data-aos="fade-up" data-aos-duration="3000" className="singleOffer">
                  <div className="eventImage">
                    <img src={imgSrc} alt="Image Name" />
                  </div>

                  <div className="offerBody">
                    <div className="price flex">
                      <h4>
                        {grade}
                      </h4>
                      <span className="status">
                      Schedule
                      </span>
                    </div>

                    <div className="amenities flex">
                      <div className="singleAmenity flex">
                        <GoLaw className="icon" />
                        <small> {eventTitle}</small>
                      </div>
                      <div className="singleAmenity flex">
                        <GoLaw className="icon" />
                        <small>{title1}</small>
                      </div>
                      <div className="singleAmenity flex">
                        <GoLaw className="icon" />
                        <small>{title2}</small>
                      </div>
                      <div className="singleAmenity flex">
                        <GoLaw className="icon" />
                        <small>{title3}</small>
                      </div>
                    </div>
                    <button className="btn flex">
                      View Details
                      <IoMdArrowForward className="icon" />
                    </button>

                  </div>
                </div>
              )

            })

          }

        </div>
      </div>
    </section>

  )

}

export default Offers