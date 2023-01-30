import React from 'react'
import './RightSide.css'
import Home from '../../img/homes.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import FollowersCard from '../FollowersCard/FollowersCard'
import { Bookmark } from 'tabler-icons-react';
import { Bell } from 'tabler-icons-react';
import { MessageDots } from 'tabler-icons-react';
import { useState } from 'react'
import Notification from '../Notification/Notification'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getNotifications, getSeenNotifications } from '../../api/UserRequest'


const RightSide = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [notes, setNotes] = useState([])
  console.log(user,'---------------user in notifid')
  const [allnotes,setAllnotes] = useState([])
  const userId = user._id


  const [show, setShow] = useState(false)

  const handleBell = () => {
    if (show === false) setShow(true)
    else setShow(false)
  }
  useEffect(() => {
    if(show === true){
      Notifications()
      // SeenNotification()
      console.log('-show')
    }
    else if(show === false){
      console.log('not shhow')
      // Notifications()
      SeenNotification()
    }
  }, [])
  const Notifications = async () => {
    const notifications = await getNotifications(userId)
    const allNotifications = notifications.data
    setNotes(allNotifications)
    // console.log(allNotifications, '--------allNotifications')
  }
  const SeenNotification = async()=>{
    const SeenNotifi = await getSeenNotifications(userId)
    const AllSeen = SeenNotifi.data

    console.log(SeenNotifi,'--------seen')
  }
  

  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to={'../home'}>
          <img src={Home} alt="" />
        </Link>
        <Link to={'../saved'}>
          <Bookmark style={{ cursor: 'pointer' }} />
        </Link>
        <div className='notify'>
          <Bell onClick={handleBell} />
          <span className="notification-icon">{notes.length} </span>
        </div>

        <Link to={'../chat'}>
          <MessageDots />
        </Link>
      </div>
      {show ?
        <Notification notes={notes} />
        : ''}
      <FollowersCard location={location} />

    </div>
  )
}

export default RightSide