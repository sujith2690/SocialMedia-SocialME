import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { ArrowUpRightCircle } from 'tabler-icons-react';
import { getUser } from "../../api/UserRequest";
import { followUser, unFollowUser } from '../../Actions/UserAction'
import { Edit } from 'tabler-icons-react';
import ProfileModal from "../ProfileModal/ProfileModal";
import { createChat } from "../../api/ChatRequest";

function ProfileCard({ location }) {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { user } = useSelector((state) => state.authReducer.authData)
    const posts = useSelector((state) => state.postReducer.posts)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const [searchuser, setsearchuser] = useState(null)
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [userPost, setUserPost] = useState([])
    const [followings, setFollowings] = useState(user.following.includes(id))
    const [modalOpened, setModalOpened] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFollowers = async () => {
            if (id !== user._id) {
                const { data } = await getUser(id)
                setFollowers(data.followers)
                setFollowing(data.following)
                setsearchuser(data)
            } else {
                const { data } = await getUser(user._id)
                setFollowers(data.followers)
                setFollowing(data.following)
                setUserPost(data.allPosts)

            }
        }
        fetchFollowers()
    }, [id])
    const handleFollow = () => {
        following ?
            dispatch(unFollowUser(id, user)) :
            dispatch(followUser(id, user))
        setFollowings((prev) => !prev)
    }
    const handleChat = async () => {
        const senderId = user._id
        const receiverId = id
        await createChat({ senderId, receiverId }).then((response) => {
        navigate('/chat')
        })
    }

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                {!searchuser ? <img className="coverImages" src={user?.coverPicture ? serverPublic + user?.coverPicture : serverPublic + "coverimage.jpg"} alt="" />
                    :
                    <img className="coverImages" src={searchuser?.coverPicture ? serverPublic + searchuser?.coverPicture : serverPublic + "coverimage.jpg"} alt="" />
                }

                {!searchuser ?
                    <div onClick={() => setModalOpened(true)}>
                        <div>
                            <img className="profilesImages" src={user?.profilePicture ? serverPublic + user?.profilePicture : serverPublic + "avatar.png"} alt="" />
                        </div>
                        <div className="pen">
                            <Edit className='editPen' width='2rem' height='1.2rem' />
                            <ProfileModal
                                modalOpened={modalOpened}
                                setModalOpened={setModalOpened}
                                data={user}
                            />
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <img className="profilesImages" src={searchuser?.profilePicture ? serverPublic + searchuser?.profilePicture : serverPublic + "avatar.png"} alt="" />

                        </div>
                    </div>
                }
            </div>
             {
                    user._id !== id ? 
                    <button className='button' onClick={handleChat} >Message</button >
                    // <button className='button' onClick={handleChat}>hai</button>
                        : ''
                }
            <div className="ProfileName">
                {!searchuser ? <span>{user.firstname} {user.lastname} {user.verified ? <ArrowUpRightCircle style={{ color: 'rgba(15, 37, 230, 0.788)' }} /> : ''}</span>
                    : <span>{searchuser.firstname} {searchuser.lastname} {searchuser.verified ? <ArrowUpRightCircle style={{ color: 'rgba(15, 37, 230, 0.788)' }} /> : ''}</span>
                }

                {/* {
                    user._id !== id ? 
                    // <button className='button logout-button' onClick={handleChat} >Message</button >
                    <button className='button' onClick={handleChat}>hai</button>
                        : ''
                } */}
            </div>

            <div>
                {!searchuser ?

                    <div className="profileDetails">
                        {user.country ? <> <p>{user.relationship}<b>: Status</b></p>

                            <p> {user.worksAt}<b>: worksAt</b></p>
                            <p> {user.livesIn} {user.country}<b>: livesIn</b></p></> : ''}

                    </div>
                    :
                    <div className="profileDetails">
                        {searchuser.country ?
                            <> <p>{searchuser.relationship}<b>: Status</b></p>
                                <p> {searchuser.worksAt}<b>: WorksAt</b></p>
                                <p> {searchuser.livesIn} {searchuser.country}<b>: livesIn</b></p>
                            </> : ''}

                    </div>
                }
            </div>
            {id !== user._id ?
                <div className="userFollo">
                    <div className="customBut">
                        <button className={followings ? "button fc-button UnfollowButton" : "button fc-button "} onClick={handleFollow}>
                            {followings ? "Unfollow" : "Follow"}
                        </button>



                    </div>
                </div>
                : ""}
            <div className="followStatus">
                {/* <hr /> */}
                <div>
                    <div className="follow">
                        {!searchuser ? <span>{user.following?.length}</span>
                            : <span>{searchuser?.following?.length}</span>
                        }
                        <span>Following</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        {!searchuser ? <span>{user.followers?.length}</span>
                            : <span>{searchuser?.followers?.length}</span>
                        }
                        <span>Followers</span>
                    </div>
                    {location !== 'homepage' ?
                        <>
                            <div className="vl">
                            </div>
                            <div className="follow">
                                {!searchuser ? <span>{userPost.length}</span>
                                    : <span>{searchuser?.allPosts?.length}</span>
                                }
                                <span>Posts</span>
                            </div>
                        </>
                        : ""}
                </div>
                {/* <hr /> */}
            </div>

        </div>
    );
}

export default ProfileCard;
