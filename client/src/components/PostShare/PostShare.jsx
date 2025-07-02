import React, { useState, useRef } from 'react'

import './PostShare.css'
import { UilScenery } from "@iconscout/react-unicons"
import { UilPlayCircle } from "@iconscout/react-unicons"
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilTimes } from "@iconscout/react-unicons"
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../Actions/uploadAction'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'


function PostShare({ fetchPosts }) {
    const navigate = useNavigate()

    const notify = () => toast.error('Unsupported Format');
    const notify1 = () => toast.error('Large file Format');
    const [load, setLoad] = useState(false)

    const loading = useSelector((state) => state.postReducer.uploading)

    const { user } = useSelector((state) => state.authReducer.authData)
    const userId = user._id
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const desc = useRef()
    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const dispatch = useDispatch()

    const onImageChange = (event) => {
        // if (event.target.files && event.target.files[0]) {
        //     if (event.target.files[0].type === 'image/x-png' || event.target.files[0].type === 'image/gif' || event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/jpg') {
        //         let img = event.target.files[0];
        //         setImage(img);
        //     } else {
        //         notify()
        //     }
        // }

        if (event.target.files && event.target.files[0]) {
            const allowedTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
            const maxSizeInBytes = 1024 * 1024 * 2; // 1 MB

            const file = event.target.files[0];
            if (allowedTypes.includes(file.type) && file.size <= maxSizeInBytes) {
                setImage(file);
            } else {
                if (file.size >= maxSizeInBytes) {
                    notify1();
                    reset()
                } else {
                    notify();
                    reset()
                }
            }
        }
    }

    const reset = () => {
        setImage(null);
        desc.current.value = ""
    }
    const handleSubmit = async (e) => {
        setLoad(true)
        if (desc.current.value || image) {
            e.preventDefault();
            const newPost = {
                userId: user._id,
                desc: desc.current.value
            }
            if (image) {
                const data = new FormData()
                const filename = Date.now() + image.name
                data.append("name", filename)
                data.append("file", image)
                newPost.image = filename
                try {
                    await dispatch(uploadImage(data));
                } catch (error) {
                    console.log(error, 'error in postshare')
                }
            }
            await dispatch(uploadPost(newPost))
            fetchPosts()
            reset()
            setLoad(false)
        }
    }

    return (
        <div className='PostShare'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img onClick={() => navigate(`/profile/${user._id}`)} style={{ cursor: 'pointer' }} className='share' src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "avatar.png"} alt="" />
                <input
                    ref={desc}
                    type="text" placeholder="What's Happening" />
            </div>
            <div className='allItems'>
                <div className="postOptions">
                    <div className='option' style={{ color: "var(--photo)" }}
                        onClick={() => imageRef.current.click()}
                    >
                        <UilScenery />
                        Photo
                    </div>
                    <div className='option' style={{ color: "var(--video)" }} >
                        <UilPlayCircle />Video
                    </div>
                    <div className='option' style={{ color: "var(--location)" }}>
                        <UilLocationPoint />Location
                    </div>

                    {
                        load ? <Spinner /> : <button className='button ps-button'
                            onClick={handleSubmit}
                            disabled={loading}>
                            Share
                        </button>
                    }
                    {/* <button className='button ps-button'
                        onClick={handleSubmit}
                        disabled={loading}>
                        {loading ? "Loading..." : "Share"}
                    </button> */}
                    <div style={{ display: "none" }}>
                        <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} accept="image/png, image/gif, image/jpeg" />
                    </div>
                </div>

                {image && (
                    <div className="previewImage">
                        {/* / close button / */}
                        <UilTimes style={{ color: 'red' }} onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}

            </div>
        </div>
    )
}

export default PostShare