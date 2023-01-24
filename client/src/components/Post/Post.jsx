import React, { useState } from 'react'
import './Post.css'
import Comments from '../../img/comment.png'
import likeIcon from '../../img/liked.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import Comment from '../comments/Comment'
import { Bookmark } from 'tabler-icons-react';
import { BookmarkOff } from 'tabler-icons-react';
import { DotsVertical } from 'tabler-icons-react';
import { getUser, postReport } from '../../api/UserRequest.js'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Post = ({ location, data, fetchpost }) => {
    //////////////////////////////////////
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    /////////////////////////////////////

    const postOwnerId = data.userId

    const { user } = useSelector((state) => state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const [liked, setLiked] = useState(data.likes.includes(user._id))
    const [likes, setLikes] = useState(data.likes.length)
    const [cshow, csetShow] = useState(false)

    const [totalComm, setTotalComm] = useState(data.comments.length)
    const [saveShow, setsaveShow] = useState(true)
    const [save, setsave] = useState(data.savedusers?.includes(user._id))
    const [postOwner, usepostOwner] = useState(null)

    const handleRemove = async () => {
        const response = await axios.delete(`/post/${data._id}/delete`, { userId: user._id })
        console.log(response.data, '---------remove')
    }
    const handleLike = async () => {
        const response = await axios.put(`/post/${data._id}/like`, { userId: user._id })
        if (response.data === "Post UnLiked") {
            setLikes(likes - 1)
            setLiked(false)
        }
        else if (response.data === "Post Liked") {
            setLikes(likes + 1)
            setLiked(true)
        }
    }
    const handleSave = async () => {
        const response = await axios.put(`/post/${data._id}/save`, { userId: user._id })
        if (response.data === "Post Saved") {
            setsave(true)
            if (location === 'saved') {
                setsaveShow(true)
            }
        } else {
            if (location === 'saved') {
                setsaveShow(false)
            }
            setsave(false)
        }
    }
    const handleShow = () => {
        if (cshow === false) {
            csetShow(true)
        } else {
            csetShow(false)
        }
    }
    const handleDelete = async () => {
        // const response = await axios.delete(`/post/${data._id}/delete`, { userId: user._id })
        // console.log(response,'-----------deleted')
        setAnchorEl(null);
        fetchpost()
    }
    const handleReport = async (postId, userId) => {
        const response = await postReport(postId)
    }
    const countComment = () => {
        setTotalComm((prev) => prev + 1)
        console.log(data, '-------------countComment')
    }
    useEffect(() => {
        if (location === 'saved') {
            const savedUser = async () => {
                const post = await getUser(postOwnerId)
                const pOwn = post.data
                usepostOwner(pOwn)
            }
            savedUser()
        }
    }, [])
    return (saveShow === true ?
        <div className="Post">
            <div className='PostOptions'>
                <div className="PostUser">

                    {postOwner ? <img className="Profileimg" src={postOwner.profilePicture ? serverPublic + postOwner.profilePicture : serverPublic + "avatar.png"} alt="" />
                        : <img className="Profileimg" src={data.profilePicture ? serverPublic + data.profilePicture : serverPublic + "avatar.png"} alt="" />
                    }
                    {postOwner ? <p><b>{postOwner.firstname} {postOwner.lastname}</b></p>
                        : <p ><b>{data.firstname} {data.lastname}</b></p>}
                </div>
                <div className='opps' >
                    {save ?
                        <span className='saveoptions'>
                            < BookmarkOff onClick={handleSave} />saved</span>
                        : < Bookmark onClick={handleSave} />
                    }
                    <DotsVertical onClick={handleClick} />
                    <Menu className='menuoptions'
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >{postOwnerId === user._id ?
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        : ""}
                        <MenuItem onClick={() => handleReport(data._id)}>Report</MenuItem>
                    </Menu>
                </div>
            </div>
            <div>
                <img src="" alt="" />
            </div>
            <div className='Discription'>
                <span >{data.desc}</span>
            </div>
            <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />
            <div className="PostReact">
                <div className='PostReact'>
                    <img src={liked ? likeIcon : NotLike} className='PostIcon' alt=""  onClick={handleLike} />
                    <span className='likeandcomment' >{likes} Likes</span>
                    <img className='PostIcon' src={Comments} alt="" onClick={handleShow} />
                    <span className='likeandcomment'>{totalComm} Comments</span>
                    {/* <img className='PostIcon' src={Share} alt="" /> */}
                </div>
            </div>
            {cshow === true ?
                <Comment postId={data._id} countComment={countComment} />
                : ""
            }
        </div>
        : ""

    )
}

export default Post