import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getNotifications } from '../../api/UserRequest'
import './notification.css'




const Notification = ({ notes }) => {


    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div className='Notification'>
            
            {notes.map((items, i) => {
                return (
                    <div className='notificationdetails' key={i} >
                        <img src={items.userData.profilePicture ? serverPublic + items.userData.profilePicture : serverPublic + "avatar.png"} alt=""
                            className='notifyImagess' />
                        <div className="content">
                            <p>{items.unseenNotifications.content}</p>
                        </div>
                    </div>
                )
            })}
         
         <hr />
                <span>Seen Notifications</span>
                {notes.map((items, i) => {
                return (
                    <div className='notificationdetails' key={i} >
                        <img src={items.userData.profilePicture ? serverPublic + items.userData.profilePicture : serverPublic + "avatar.png"} alt=""
                            className='notifyImagess' />
                        <div className="content">
                            <p>{items.unseenNotifications.content}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Notification