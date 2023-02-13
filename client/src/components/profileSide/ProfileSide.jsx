import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import Menu from '../Menu/Menu'
import ProfileCard from '../ProfileCard/ProfileCard'
import "./ProfileSide.css"

function ProfileSide() {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      {/* <Menu/> */}

      <div id='profileDiv'>
        <ProfileCard location="homepage" />
      </div>

    </div>
  )
}

export default ProfileSide