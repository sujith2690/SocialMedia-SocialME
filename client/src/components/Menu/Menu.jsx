import React, { useEffect, useRef } from 'react'
import './menu.css'
import { Bookmark } from 'tabler-icons-react';
import { Bell } from 'tabler-icons-react';
import { MessageDots } from 'tabler-icons-react';
import { useState } from 'react'
import { UserCircle } from 'tabler-icons-react';
import Home from '../../img/homes.png'
import { UilSearch } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClearNotifications, getNotifications, searchUser } from '../../api/UserRequest';
import { logOut } from '../../Actions/AuthAction';
import { Logout } from 'tabler-icons-react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Menu = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const userId = user._id
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const navigate = useNavigate()
    const [Result, setResult] = useState([])
    const [show, setshow] = useState(false)
    const dispatch = useDispatch();
    const reset = () => {
        desc.current.value = ""
    }
    const search = async (e) => {
        if (desc.current.value) {
            if (show === false) {
                setshow(true)
            }
            e.preventDefault()
            const userdis = {
                desc: desc.current.value
            }
            const response = await searchUser(userdis)
            const userDetails = response.data
            setResult(userDetails)
            reset()
        } else {
            if (show === true) {
                setshow(false)
            }
        }
    }
    const handleLogOut = () => {
        dispatch(logOut())
    }
    const handleClear = async () => {
        await ClearNotifications(userId)
        setNotes([])
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
    useEffect(() => {
        Notifications()
      }, [])
    const Notifications = async () => {
        const notifications = await getNotifications(userId)
        const allNotifications = notifications.data
        setNotes(allNotifications)
      }
    const [notes, setNotes] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="menu">
            <div>
                <h2>SocialME</h2>
            </div>
            <form action=""  onSubmit={search}>
                <div className="search">
                    <input type="text" className='textbox' placeholder='Search User' ref={desc} />
                    <UilSearch className='s-icons' onClick={search} />
                </div>
            </form>
            {show === true ?
                <div className='searchoutput'>
                    {Result.map((item, i) => {
                        return (
                            <div className='resultlocation' key={i} onClick={() => navigate(`/profile/${item._id}`)}  >
                                <img className="SearchProfile" src={item.profilePicture ? serverPublic + item.profilePicture : serverPublic + "avatar.png"} alt="" />
                                <span style={{ marginLeft: '10px', marginTop: 10, color: 'white' }} >
                                    {item.firstname} {item.lastname}
                                </span>
                            </div>
                        )
                    })}
                </div>
                : ''}
            <div className='menuitems'  onClick={() => navigate('/home')}>
                <img className='homeimage' src={Home} alt="" />
                <p>Home</p>
            </div>
            <div className='menuitems' onClick={() => navigate('/saved')}>
                <Bookmark />
                <p>Saved Posts</p>
            </div>
            <div className='menuitems' onClick={handleOpen}>
                <Bell />
                <p>Notification</p>{notes.length > 0 ? <span className="notification-icon">{notes.length} </span> : ''}
            </div>
            <div className='menuitems' onClick={() => navigate('/chat')} >
                <MessageDots />
                <p>Chat</p>
            </div>
            <div className='menuitems' onClick={() => navigate(`/profile/${user._id}`)} >
                <UserCircle />
                <p>Profile</p>
            </div>
            <div className='menuitems' onClick={handleLogOut}>
                <Logout />
                <p>LogOut</p>
            </div>
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
                                        <p style={{ fontSize: 15 }}>{items.Notifications.content}</p>
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

export default Menu