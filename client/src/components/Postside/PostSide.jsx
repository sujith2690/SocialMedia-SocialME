import React, { useEffect, useState } from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSavedPost, getTimelinePosts } from '../../api/PostRequest'

function PostSide({ location }) {
  const params = useParams()
  const otherUserid = params.id
  let [posts, setPosts] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData)
  const fetchPosts = async () => {

    if (otherUserid) {
      const { data } = await getTimelinePosts(otherUserid)
        setPosts(data)
    }
    else {
      const { data } = await getTimelinePosts(user._id)
      setPosts(data)
    }
  }
  const savedPost = async () => {

    const { data } = await getSavedPost(user._id)
    setPosts(data)
  }
  useEffect(() => {
    if (location === "saved") {
      savedPost()

    } else {
      fetchPosts()
    }
  }, [])
  return (
    <div className="PostSide">
      <PostShare fetchPosts={fetchPosts} />
      <Posts location='saved' data={posts} fetchPosts={fetchPosts} />
    </div>
  )
}

export default PostSide