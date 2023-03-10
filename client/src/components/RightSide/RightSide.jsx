import React from 'react'
import './RightSide.css'
import Home from '../../img/homes.png'
import FollowersCard from '../FollowersCard/FollowersCard'
import { Bookmark } from 'tabler-icons-react';
import { Bell } from 'tabler-icons-react';
import { MessageDots } from 'tabler-icons-react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ClearNotifications, getNotifications } from '../../api/UserRequest'
import { UserCircle } from 'tabler-icons-react';
import { Logout } from 'tabler-icons-react';
import { logOut } from '../../Actions/AuthAction'
import { useNavigate } from 'react-router-dom'


import NotificaionModal from '../Modal/NotificaionModal';

const RightSide = ({ location } ) => {
  
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = useSelector((state) => state.authReducer.authData)
  const [notes, setNotes] = useState([])
  const userId = user._id
  const navigate = useNavigate()

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
 

   // Notification Modal
   const [notiModal, setNotiModal] = React.useState(false);
   const handleNotification = () => {
       setNotiModal(!notiModal)
   }
   const closeModal = () => {
       setNotiModal(false)
   }

  return (
    <div className="RightSide">

      <div className="navIcons">
        <div>
          <img className='homeimage' src={Home} alt="" onClick={() => navigate('/home')} />
        </div>
        <div>
          <Bookmark style={{ cursor: 'pointer' }} onClick={() => navigate('/saved')} />
        </div>
        <div className='notify'>
          <Bell
           onClick={handleNotification}
          />
          {notes.length > 0 ? <span className="notification-icon">{notes.length} </span> : ''}
        </div>
        <div>
          <MessageDots onClick={() => navigate('/chat')} />
        </div>
        <div>
          <UserCircle onClick={() => navigate(`/profile/${user._id}`)} />
        </div>
        <div>
          <Logout onClick={handleLogOut} />
        </div>
      </div>
      
      <FollowersCard  location={location} />

     
      <NotificaionModal notiModal={notiModal} notes={notes} handleClear={handleClear} closeModal={closeModal} />
    </div>
  )
}

export default RightSide