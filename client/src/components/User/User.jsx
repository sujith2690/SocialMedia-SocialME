import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../Actions/UserAction'
import { Link } from 'react-router-dom'

const User = ({ person }) => {
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

    const handleProfileview = async () => {

    }

    return (
        
        <div className="followers">
            <div>
                <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "avatar.png"} alt=""
                    className='followerImagess' onClick={handleProfileview} />
                <div className="name">

                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${person._id}`}>
                        <span><b>{person.firstname} {person.lastname}</b></span>
                    </Link>
                </div>
            </div>
            <button className={following ? "button fc-button UnfollowButton" : "button fc-button "} onClick={handleFollow}>
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>
        
    )
}

export default User