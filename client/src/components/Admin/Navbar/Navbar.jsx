import React, { useRef, useState } from 'react'
import './navbar.css'
import Logo from '../../../img/hlogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'tabler-icons-react';
import { Notification } from 'tabler-icons-react';
import { MessageDots } from 'tabler-icons-react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { searchUser } from '../../../api/UserRequest';
import { UilSearch } from '@iconscout/react-unicons'


const Navbar = ({ location }) => {

    const desc = useRef()
    const navigate = useNavigate()
    const [Result, setResult] = useState([])
    const [show, setshow] = useState(false)

    const { user } = useSelector((state) => state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
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
    return (
        <div className='navBar'>
            <div className='mainNavbar'>
                <form action="" onSubmit={search}>
                    <div className="search">
                        <input type="text" className='textbox' placeholder='Search User' ref={desc} />
                        <UilSearch className='s-icons' onClick={search} />
                    </div>
                </form>

                {/* <div className='IconsContainer'>
                    {location === "Home" ?
                        ""
                        : <span>Admin</span>}
                </div> */}
                <div className='LogoContainer'>
                    <img src={Logo} alt="" />
                    <p>SocialME</p>
                </div>
            </div>
            {location === "Home" ?
                <>
                    {show === true ?
                        <div className='navResult'>
                            {Result.map((item, i) => {
                                return (
                                    <div className='resultlocation' key={i} onClick={() => navigate(`/profile/${item._id}`)}  >
                                        <img className="SearchProfile" src={item.profilePicture ? serverPublic + item.profilePicture : serverPublic + "avatar.png"} alt="" />
                                        <span style={{ marginLeft: '10px', marginTop: 10 }} >
                                            {item.firstname} {item.lastname}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                        : ''}
                </>
                : ''}
        </div>
    )
}

export default Navbar





