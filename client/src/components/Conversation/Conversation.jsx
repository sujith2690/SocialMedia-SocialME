import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../../api/UserRequest'

const Conversation = ({ data, currentUserId, online }) => {

    const [userData, setuserData] = useState(null)
    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setuserData(data)
            } catch (error) {
                console.log(error)
            }

        }
        getUserData()
    }, [])

    return (
        <>
            <div className="follower conversation" >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {online && <div className="online-dot"></div>}
                    <img src={userData?.profilePicture ?
                        process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture :
                        process.env.REACT_APP_PUBLIC_FOLDER + "avatar.png"} alt=""
                        className='followerImage'
                        style={{ width: '50px', height: '50px' }}
                    />
                    <div className="name" style={{ fontSize: '0.8rem' }}>
                        <span style={{ marginLeft: '10px' }}>{userData?.firstname} {userData?.lastname}</span>
                        <span style={{ marginLeft: '10px' }}>
                            {
                                online ? <span className='online-status'>Online</span> : <span className='offline-status'>Offline</span>
                            }
                        </span>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Conversation