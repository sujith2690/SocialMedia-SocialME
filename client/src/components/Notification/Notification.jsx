import React from 'react'
import './notification.css'




const Notification = ({ notes,handleClear }) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div className='Notification'>
            {notes.map((items, i) => {
                return (
                    <div className='notificationdetails' key={i} >
                        <img src={items.userData.profilePicture ? serverPublic + items.userData.profilePicture : serverPublic + "avatar.png"} alt=""
                            className='notifyImagess' />
                        <div className="content">
                            <p>{items.Notifications.content}</p>
                        </div>
                    </div>
                )
            })}

            <hr />
            <span className='clear' onClick={handleClear}>Clear all</span>

        </div>
    )
}

export default Notification