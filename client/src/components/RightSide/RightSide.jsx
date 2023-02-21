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

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'white',
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            onClick={handleOpen}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Notifications...
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {notes.map((items, i) => {
              return (
                <div className='notificationdetails' key={i} >
                  <img src={items.userData.profilePicture ? serverPublic + items.userData.profilePicture : serverPublic + "avatar.png"} alt=""
                    className='notifyImagess' />
                  <div className="content">
                    <p style={{fontSize:15}}>{items.Notifications.content}</p>
                  </div>
                </div>
              )
            })}
            <hr />
            <span className='clear' onClick={handleClear}>Clear all</span>
          </Typography>
        </Box>
      </Modal>

    </div>
  )
}

export default RightSide