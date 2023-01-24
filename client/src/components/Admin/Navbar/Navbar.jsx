import React from 'react'
import './navbar.css'
import Logo from '../../../img/hlogo.png'
import { Link } from 'react-router-dom'
import { Search } from 'tabler-icons-react';
import { Notification } from 'tabler-icons-react';
import { MessageDots } from 'tabler-icons-react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const Navbar = () => {
    //////////////////////////////////////

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    /////////////////////////////////////



    return (
        <div className='mainNavbar'>

            <div className='LogoContainer'>
                <img src={Logo} alt="" />
                <p>AmazeMe</p>
            </div>
            <div>
                <div className='searchInputContainer'>
                    <Search className='searchIcon' />
                    <input className='searchInput' placeholder='Search User' type="text" />
                </div>
            </div>
            <div className='IconsContainer'>
                <Notification />
                <MessageDots />
                <div className="dropdown">
                    <span>Admin</span>
                    <div className="dropdown-content">
                        <p>Logout</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Navbar





