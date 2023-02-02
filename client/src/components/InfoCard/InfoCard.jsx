import React, { useEffect } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal.jsx'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest.js'
import { logOut } from '../../Actions/AuthAction'
import { createChat } from '../../api/ChatRequest'


const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false)
    const dispatch = useDispatch();
    const params = useParams();
    const profileUserId = params.id
    const [profileUser, setProfileUser] = useState({})
    const { user } = useSelector((state) => state.authReducer.authData)
    const senderId = user._id
    const receiverId = profileUserId
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user)
            }
            else {
                const profile = await UserApi.getUser(profileUserId)
                setProfileUser(profile.data)
            }
        }
        fetchProfileUser();
    }, [profileUserId])

    const handleLogOut = () => {
        dispatch(logOut())
    }
    const handleChat = async () => {
         await createChat({ senderId, receiverId }).then((response) => {
             navigate('/chat')
         })
    }
    return (
        <div className='InfoCard'>
            <div className="infoHead">
                <p><b>{profileUser.firstname}</b> Profile Info</p>
                {user._id === profileUserId ? (
                <div>
                    <UilPen width='2rem' height='1.2rem' onClick={() => setModalOpened(true)} />
                    <ProfileModal
                        modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                        data={user}
                    />
                </div>) : ""}

            </div>
            
            <div className="Info">
                <span>
                    <b>Status</b>
                </span>
                <span> {profileUser.relationship}</span>
            </div>
            <div className="info">
                <span>
                    <b>Lives in</b>
                </span>
                <span> {profileUser.livesIn}</span>
            </div>
            <div className="info">
                <span>
                    <b>Works At</b>
                </span>
                <span> {!profileUser ? user.worksAt:profileUser.worksAt } </span>
            </div>


            {user._id === profileUserId ? <button className='button logout-button' onClick={handleLogOut} >Log out</button>
                : 
                    <button className='button logout-button' onClick={handleChat} >Message</button >
            }
        </div>
    )
}

export default InfoCard