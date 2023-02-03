import React, { useState, useRef } from 'react'

import './PostShare.css'
import { UilScenery } from "@iconscout/react-unicons"
import { UilPlayCircle } from "@iconscout/react-unicons"
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilTimes } from "@iconscout/react-unicons"
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../Actions/uploadAction'



function PostShare({ fetchPosts }) {

    const loading = useSelector((state) => state.postReducer.uploading)

    const { user } = useSelector((state) => state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const desc = useRef()
    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const dispatch = useDispatch()

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].type === 'image/x-png' || event.target.files[0].type === 'image/gif' || event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/jpg') {
                let img = event.target.files[0];
                setImage(img);
            }else{

            }
        }
        //     let img = e.target.files[0]
        //     setImage(img)
    }

    const reset = () => {
        setImage(null);
        desc.current.value = ""
    }
    const handleSubmit = (e) => {
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
                    dispatch(uploadImage(data));
                } catch (error) {
                    console.log(error, 'error in postshare')
                }
            }
            dispatch(uploadPost(newPost))
            fetchPosts()
            reset()
        }
    }

    return (
        <div className='PostShare'>
            <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "avatar.png"} alt="" />
            <div>
                <input
                    ref={desc}
                    type="text" placeholder="What's Happening" />
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
                    {/* <div className='option' style={{ color: "var(--shedule)" }}>
                        <UilSchedule />Shedule
                    </div> */}
                    <button className='button ps-button'
                        onClick={handleSubmit}
                        disabled={loading}>
                        {loading ? "Loading..." : "Share"}
                    </button>
                    <div style={{ display: "none" }}>
                        <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} accept="image/png, image/gif, image/jpeg" />
                    </div>
                </div>

                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}

            </div>
        </div>
    )
}

export default PostShare