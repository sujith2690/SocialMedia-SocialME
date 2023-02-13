import React, { useRef } from 'react'
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
import { searchUser } from '../../api/UserRequest';
import { logOut } from '../../Actions/AuthAction';
import { Logout } from 'tabler-icons-react';

const Menu = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
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

    return (
        <div className="menu">
            <form action="" onSubmit={search}>
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
            <div className='menuitems' onClick={() => navigate('/home')}>
                <img className='homeimage' src={Home} alt="" />
                <p>Home</p>
            </div>
            <div className='menuitems' onClick={() => navigate('/saved')}>
                <Bookmark />
                <p>Saved Posts</p>
            </div>
            <div className='menuitems'>
                <Bell />
                <p>Notification</p>
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

        </div>
    )
}

export default Menu