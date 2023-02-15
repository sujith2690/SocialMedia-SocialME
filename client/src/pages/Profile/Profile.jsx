import React from 'react'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import PostSide from '../../components/Postside/PostSide'
import RightSide from '../../components/RightSide/RightSide'

import './Profile.css'

const Profile = () => {
  return (
    <div className='Profile'>
      <ProfileLeft />
      <PostSide location="Profile" />
      <RightSide location='Profile' />
    </div>
  )
}
export default Profile