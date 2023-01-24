import React from 'react'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import PostSide from '../../components/Postside/PostSide'
import RightSide from '../../components/RightSide/RightSide'

import './Profile.css'

const Profile = () => {
  return (
    <div className='Profile'>
      <ProfileLeft/>
      <div className="Profile-center">
        <ProfileCard location="Profile" />
        <PostSide />
      </div>
      <RightSide location='Profile'/>
    </div>
  )
}
export default Profile