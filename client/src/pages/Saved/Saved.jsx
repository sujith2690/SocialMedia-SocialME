import React from 'react'
import './saved.css'

import PostSide from '../../components/Postside/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'

const Saved = () => {
  return (
    <div className="Saved">
        <ProfileSide/>
        <PostSide location='saved' />
        <RightSide location='Home' />
    </div>
  )
}

export default Saved