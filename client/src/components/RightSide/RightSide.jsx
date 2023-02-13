import React from 'react'
import './RightSide.css'
import Home from '../../img/homes.png'
import { Link } from 'react-router-dom'
import FollowersCard from '../FollowersCard/FollowersCard'
import { Bookmark } from 'tabler-icons-react';
import { Bell } from 'tabler-icons-react';
import { MessageDots } from 'tabler-icons-react';
import { useState } from 'react'
import Notification from '../Notification/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ClearNotifications, getNotifications } from '../../api/UserRequest'
import { UserCircle } from 'tabler-icons-react';
import { Logout } from 'tabler-icons-react';
import { logOut } from '../../Actions/AuthAction'

const RightSide = ({ location }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData)
  const [notes, setNotes] = useState([])
  const userId = user._id


  const [show, setShow] = useState(false)

  const handleBell = () => {
    if (show === false) setShow(true)
    else setShow(false)
  }
  useEffect(() => {
    Notifications()
  }, [])
  const Notifications = async () => {
    const notifications = await getNotifications(userId)
    const allNotifications = notifications.data
    setNotes(allNotifications)
  }

  const handleClear = async () => {
    await ClearNotifications(userId)
    setNotes([])
  }
  const handleLogOut = () => {
    dispatch(logOut())
}

  return (
    <div className="RightSide">
      <div className="navIcons">
        <div>
          <Link to={'../home'}>
            <img className='homeimage' src={Home} alt="" />
          </Link>
        </div>
        <div>
          <Link to={'../saved'}>
            <Bookmark style={{ cursor: 'pointer' }} />
          </Link>
        </div>
        <div className='notify'>
          <Bell onClick={handleBell} />
          {notes.length > 0 ? <span className="notification-icon">{notes.length} </span> : ''}
        </div>

        <div>
          <Link to={'../chat'}>
            <MessageDots />
          </Link>
        </div>
        {/* <div>
          <Link to={`/profile/${user._id}`}>
            <UserCircle />
          </Link>
        </div> */}
        <div>
          <Link to={`/profile/${user._id}`}>
            <Logout onClick={handleLogOut} />
          </Link>
        </div>
      </div>
      {show ?
        <Notification notes={notes} handleClear={handleClear} />
        : ''}
      <FollowersCard location={location} />

    </div>
  )
}

export default RightSide