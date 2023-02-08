import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { ArrowUpRightCircle } from 'tabler-icons-react';
import { getUser } from "../../api/UserRequest";
import { followUser, unFollowUser } from '../../Actions/UserAction'


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
                {!searchuser ? <img src={user?.coverPicture ? serverPublic + user?.coverPicture : serverPublic + "coverimage.jpg"} alt="" />
                    :
                    <img src={searchuser?.coverPicture ? serverPublic + searchuser?.coverPicture : serverPublic + "coverimage.jpg"} alt="" />
                }

                {!searchuser ? <img src={user?.profilePicture ? serverPublic + user?.profilePicture : serverPublic + "avatar.png"} alt="" />
                    :
                    <img src={searchuser?.profilePicture ? serverPublic + searchuser?.profilePicture : serverPublic + "avatar.png"} alt="" />
                }
            </div>
            <div className="ProfileName">
                {!searchuser ? <span>{user.firstname} {user.lastname} {user.verified ? <ArrowUpRightCircle style={{ color: 'rgba(15, 37, 230, 0.788)' }} /> : ''}</span>
                    : <span>{searchuser.firstname} {searchuser.lastname} {searchuser.verified ? <ArrowUpRightCircle style={{ color: 'rgba(15, 37, 230, 0.788)' }} /> : ''}</span>
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
