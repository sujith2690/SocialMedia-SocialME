import React from 'react'
import './menu.css'
import { Bookmark } from 'tabler-icons-react';
import { Bell } from 'tabler-icons-react';
import { MessageDots } from 'tabler-icons-react';
import { useState } from 'react'
import { UserCircle } from 'tabler-icons-react';
import Home from '../../img/homes.png'
import { Link } from 'react-router-dom'
import LogoSearch from '../LogoSearch/LogoSearch'
import { UilSearch } from '@iconscout/react-unicons'


const Menu = () => {
    return (
        <div className="menu">

            <div className="menuitems">
                <UilSearch className='s-icons' />
            </div>
            <div className='menuitems'>
                <Link to={'../home'}>
                    <img className='homeimage' src={Home} alt="" />
                </Link>
                <p>Home</p>
            </div>
            <div className='menuitems'>
                <Link to={'../saved'}>
                    <Bookmark  />
                </Link>
                <p>Saved Posts</p>
            </div>
            <div className='menuitems'>
                <Bell />
                <p>Notification</p>
            </div>
            <div className='menuitems'>
                <Link to={'../chat'}>
                    <MessageDots />
                </Link>
                <p>Chat</p>
            </div>
            <div className='menuitems'>
                <Link to={'../profile'}>
                    <UserCircle />
                </Link>
                <p>Profile</p>
            </div>
        </div>
    )
}

export default Menu