import React from "react";
import Navbar from "../../components/Admin/Navbar/Navbar";
import PostSide from "../../components/Postside/PostSide";
import Profileside from '../../components/profileSide/ProfileSide'
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";

function Home() {
  
  return (
    <div>
      <Navbar location='Home' />
      <div className="Home">
        <Profileside />
        <PostSide  location='Home' />
        <RightSide  location='Home' />
      </div>
    </div>
  );
}

export default Home;
