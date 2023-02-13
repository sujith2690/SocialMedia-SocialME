import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import Menu from '../Menu/Menu'


const ProfileLeft = () => {
  return (
    <div className='ProfileSide'>
      <LogoSearch />

      <Menu />
      {/* <InfoCard /> */}


    </div>
  )
}

export default ProfileLeft