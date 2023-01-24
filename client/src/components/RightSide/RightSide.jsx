import React from 'react'
import './RightSide.css'
import Home from '../../img/homes.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import FollowersCard from '../FollowersCard/FollowersCard'
import { Bookmark } from 'tabler-icons-react';


const RightSide = ({ location }) => {

  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to={'../home'}>
          <img src={Home} alt="" />
        </Link>
        <Link to={'../saved'}>
        <Bookmark style={{cursor:'pointer'}} />
        </Link>
        <img src={Noti} alt="" />
        <Link to={'../chat'}>
          <img src={Comment} alt="" />
        </Link>
      </div>

      <FollowersCard location={location} />

    </div>
  )
}

export default RightSide