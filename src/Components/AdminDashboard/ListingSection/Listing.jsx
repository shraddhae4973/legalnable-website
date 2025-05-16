import React from "react"
import './listing.css'
import { BsArrowRightShort } from "react-icons/bs"
import img from '../../../Assets/1.jpg'
import { AiFillHeart } from "react-icons/ai"

const Listing = () => {
  return (
    <div className="listingSection">
      <div className="heading flex">
        <h1> Recent Activity</h1>

        <button className="abtn flex">
          See All <BsArrowRightShort className="icon" />

        </button>
      </div>

      <div className="seclistContainer flex">
        <div className="singleItem">
          <AiFillHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Annul Venue</h3>
        </div>
        <div className="singleItem">
          <AiFillHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Anniversary Event</h3>
        </div>
        <div className="singleItem">
          <AiFillHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Anniversary Event</h3>
        </div>
        
        <div className="singleItem">
          <AiFillHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Annul Venue</h3>
        </div>
      </div>

      <div className="sellers flex">
        <div className="topSellers">
          <div className="heading flex">
            <h3>Student User</h3>
            <button className="abtn flex">
              Sell All <BsArrowRightShort className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={img} alt="user Image" />
              <img src={img} alt="user Image" />
              <img src={img} alt="user Image" />
              <img src={img} alt="user Image" />
            </div>
            <div className="cardText">
              <span>
                12 Users <br />
                <small>
                  21 Users  <span className="date"> 7 Days</span>
                </small>
              </span>
            </div>
          </div>
        </div>

        <div className="featuredSellers">
          <div className="heading flex">
            <h3>Legal Users</h3>
            <button className="abtn flex">
              Sell All <BsArrowRightShort className="aIcon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={img} alt="user Image" />
              <img src={img} alt="user Image" />
              <img src={img} alt="user Image" />
              <img src={img} alt="user Image" />
            </div>
            <div className="cardText">
              <span>
                1223 Users <br />
                <small>
                  213 Users  <span className="date"> 30 Days</span>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Listing