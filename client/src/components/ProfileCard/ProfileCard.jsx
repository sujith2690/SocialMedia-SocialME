import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { ArrowUpRightCircle } from 'tabler-icons-react';
import { getUser } from "../../api/UserRequest";
import { followUser, unFollowUser } from '../../Actions/UserAction'
import { UilPen } from '@iconscout/react-unicons'
import { Edit } from 'tabler-icons-react';
import ProfileModal from "../ProfileModal/ProfileModal";

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

    useEffect(() => {
        const fetchFollowers = async () => {
            if (id !== user._id) {
                const { data } = await getUser(id)
                setFollowers(data.followers)
                setFollowing(data.following)
                setsearchuser(data)
            } else {
                const { data } = await getUser(user._id)
                console.log(data.allPosts, '----------existing user')
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
            <div className="ProfileName">
                {!searchuser ? <span>{user.firstname} {user.lastname} {user.verified ? <ArrowUpRightCircle style={{ color: 'rgba(15, 37, 230, 0.788)' }} /> : ''}</span>
                    : <span>{searchuser.firstname} {searchuser.lastname} {searchuser.verified ? <ArrowUpRightCircle style={{ color: 'rgba(15, 37, 230, 0.788)' }} /> : ''}</span>
                }
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
            {location === 'homepage' ? "" :
                <div>
                    {id !== user._id ? <div className="customBut">
                        <button className={followings ? "button fc-button UnfollowButton" : "button fc-button "} onClick={handleFollow}>
                            {followings ? "Unfollow" : "Follow"}
                        </button>
                    </div>
                        : ""}
                </div>
            }
            <div className="followStatus">
                <hr />
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
                                {/* <span>{posts.filter((post) => post.userId === user._id).length}</span> */}
                                {!searchuser ? <span>{userPost.length}</span>
                                    : <span>{searchuser?.allPosts?.length}</span>
                                }
                                <span>Posts</span>
                            </div>
                        </>
                        : ""}
                </div>
                <hr />
            </div>
            {location !== 'homepage' ? "" :
                <span>
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>
                        My Profile
                    </Link>
                </span>
            }

        </div>
    );
}

export default ProfileCard;
