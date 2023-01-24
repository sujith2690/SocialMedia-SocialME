import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../../api/UserRequest'

const Conversation = ({ data, currentUserId , online }) => {

    const [userData, setuserData] = useState(null)
    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setuserData(data)
                console.log(data, '---------data conversation')
            } catch (error) {
                console.log(error)
            }

        }
        getUserData()
    }, [])

    return (
        <>
            <div className="follower conversation" style={{marginTop:'-15px'}}>
                <div style={{display:'flex',alignItems:'center'}}>
                    {online && <div className="online-dot"></div>}
                    <img src={userData?.profilePicture ?
                        process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture :
                        process.env.REACT_APP_PUBLIC_FOLDER + "avatar.png"} alt=""
                        className='followerImage'
                        style={{ width: '50px', height: '50px' }}
                    />
                    <div className="name" style={{ fontSize: '0.8rem' }}>
                        <span>{userData?.firstname} {userData?.lastname}</span>
                        <span>{online? "Online":"Offline"}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Conversation