import React from "react"
import './admindashboard.css'
import TopSection from "./TopSection/TopSection"
import Listing from "./ListingSection/Listing"
import Activity from "./ActivitySection/Activity"

const AdminDashboard = () =>{
  return (
    <div className="mainContains">
      <TopSection/>
      <div className="bottom flex">
        <Listing/>
        <Activity/>
      </div>
    </div>
  )
}

export default AdminDashboard