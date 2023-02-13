import React, { useState } from 'react'
import './Post.css'
import Comments from '../../img/comment.png'
import likeIcon from '../../img/liked.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Comment from '../comments/Comment'
import { Bookmark } from 'tabler-icons-react';
import { BookmarkOff } from 'tabler-icons-react';
import { DotsVertical } from 'tabler-icons-react';
import { getUser } from '../../api/UserRequest.js'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deletePost, likePost, postReport, savepost } from '../../api/PostRequest'
import toast, { Toaster } from 'react-hot-toast';
import ReportModal from '../ReportModal/ReportModal'
import { useNavigate } from 'react-router-dom'



const Post = ({ location, data, fetchpost }) => {
    const navigate = useNavigate()
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
    // console.log(data,'------------all posts')
    const { user } = useSelector((state) => state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const [liked, setLiked] = useState(data.likes.includes(user._id))
    const [likes, setLikes] = useState(data.likes.length)
    const [cshow, csetShow] = useState(false)

    const [totalComm, setTotalComm] = useState(data.comments.length)
    const [saveShow, setsaveShow] = useState(true)
    const [save, setsave] = useState(data.savedusers?.includes(user._id))
    const [postOwner, usepostOwner] = useState(null)
    const postId = data._id

    const handleLike = async () => {
        const response = await likePost(data._id, user._id)
        if (response.data === "Post UnLiked") {
            setLikes(likes - 1)
            setLiked(false)
        }
        else if (response.data === "Post Liked") {
            setLikes(likes + 1)
            setLiked(true)
            toast.success('Post Liked.')
        }
    }
    const handleSave = async () => {
        const response = await savepost(data._id, user._id)
        if (response.data === "Post Saved") {
            setsave(true)
            if (location === 'saved') {
                setsaveShow(true)
                toast.success('Post Saved.')
            }
        } else if (response.data === 'Post Unsaved') {
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
        const response = await deletePost(data._id, user._id)
        setAnchorEl(null);
        fetchpost()
    }

    const countComment = () => {
        setTotalComm((prev) => prev + 1)
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

    // Report Modal

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
        handleClose()
    };

    return (saveShow === true ?

        <div className="Post">
            <Toaster />
            <div className='PostOptions'>
                <div className="PostUser"   >

                    {postOwner ? <img onClick={() => navigate(`/profile/${postOwner._id}`)} className="Profileimg" src={postOwner.profilePicture ? serverPublic + postOwner.profilePicture : serverPublic + "avatar.png"} alt="" />
                        : <img onClick={() => navigate(`/profile/${data._id}`)}  className="Profileimg" src={data.profilePicture ? serverPublic + data.profilePicture : serverPublic + "avatar.png"} alt="" />
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
                        : <MenuItem
                            onClick={toggleModal}
                        > Report</MenuItem>
                        }
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
                    <img src={liked ? likeIcon : NotLike} className='PostIcon' alt="" onClick={handleLike} />
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
            <ReportModal postId={postId} modal={modal} toggleModal={toggleModal} />
        </div>
        : ""

    )
}

export default Post