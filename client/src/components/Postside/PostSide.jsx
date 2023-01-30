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
        console.log(data,'---------otheruser posts')
    }
    else {
      const { data } = await getTimelinePosts(user._id)
      setPosts(data)
      // console.log(data,'----login user posts ')
    }
  }


  const savedPost = async () => {

    const { data } = await getSavedPost(user._id)
    // const { data } = await axios.get(`/post/${user._id}/saved`)
    setPosts(data)
    console.log(data, '--------saved posts')
  }

  useEffect(() => {
  }, [posts])

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