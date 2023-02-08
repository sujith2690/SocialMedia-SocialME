import React from "react";
import PostSide from "../../components/Postside/PostSide";
import Profileside from '../../components/profileSide/ProfileSide'
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <Profileside/>
      <PostSide location='Home' />
      <RightSide location='Home' />
    </div>
  );
}

export default Home;
