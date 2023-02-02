import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../Actions/UserAction'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRightCircle } from 'tabler-icons-react';

const User = ({ person }) => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const [following, setFollowing] = useState(person.followers.includes(user._id))
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const handleFollow = () => {
        following ?
            dispatch(unFollowUser(person._id, user)) :
            dispatch(followUser(person._id, user))
        setFollowing((prev) => !prev)

    }
    return (

        <div className="followers">
            <div onClick={() => navigate(`/profile/${person._id}`)} style={{cursor:'pointer'}} >
                <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "avatar.png"} alt=""
                    className='followerImagess'  />
                <div className="name">
                    <span><b>{person.firstname} {person.lastname}</b>{person.verified ? <ArrowUpRightCircle style={{ color: 'rgba(15, 37, 230, 0.788)' }} /> : ''}</span>
                </div>
            </div>
            <button className={following ? "button fc-button UnfollowButton" : "button fc-button "} onClick={handleFollow}>
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>

    )
}

export default User