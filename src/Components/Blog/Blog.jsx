import React, {useEffect} from "react";
import './blog.css';
import { IoMdArrowForward } from "react-icons/io";
import img from '../../Assets/2.jpg'
import Aos from 'aos';
import 'aos/dist/aos.css';


const Post = [
  {
    id: 1,
    postImage: img,
    title: 'Emma J.,',
    desc: '“Legalnable helped me understand my rights as a disabled student in university. Their workshops were clear and practical, and the support team was always approachable and patient.”'
  },
  {
    id: 2,
    postImage: img,
    title: 'Liam T.,',
    desc: '“Thanks to Legalnable, I gained confidence to speak up about accessibility issues on campus. Their advocacy programs really made a difference for me and my peers.”'
  },
  {
    id: 3,
    postImage: img,
    title: 'Sofia M.',
    desc: 'The Know Your Rights sessions were eye-opening. I learned how to navigate legal challenges and get the support I need. Legalnable truly cares about empowering students'
  },
  {
    id: 4,
    postImage: img,
    title: ' Aiden R.',
    desc: '“Legalnable’s mentorship program connected me with experienced advocates who guided me through my benefit appeal. I’m grateful for their expertise and encouragement.”'
  }
]

const Blog = () => {

      useEffect(() =>{
        Aos.init({duration: 2000})
      }, [])

  return (
    <section className="blog container section">
      <div className="secContainer">
        
        <div className="secIntro">
          <h2 data-aos="fade-up" data-aos-duration="2000"   className="secTitle">
            Student Testinomials
          </h2>
          <p data-aos="fade-up" data-aos-duration="2500"  >
            What our members has to say..
          </p>
        </div>

        <div className="mainContainer grid">
          {
            Post.map(({id, postImage, title, desc}) => {
              return (
                <div key={id} data-aos="fade-up" data-aos-duration="2000"   className="singlePost grid">
                  <div className="imgDiv">
                    <img src={postImage} alt={title}/>
                  </div>

                  <div className="postDetails">
                 
                    <p data-aos="fade-up" data-aos-duration="4000"  >{desc}</p>
                    <h3 data-aos="fade-up" data-aos-duration="3000"  >
                      {title}
                    </h3>
                  </div>

                  <a href="#" className="flex" data-aos="fade-up" data-aos-duration="4500"  >
                  
                    Read More  <IoMdArrowForward className="icon" />
                  </a>
                </div>
              )
            })
          }

        </div>
      </div>
    </section>
  )
}

export default Blog