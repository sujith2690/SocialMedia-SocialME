import React, { useEffect, useState } from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTimelinePosts, otherUserPosts } from '../../api/PostRequest'

function PostSide({ location }) {
  const params = useParams()
  const otherUserid = params.id
  let [posts, setPosts] = useState([])
  // console.log(posts, 'posts.........lll............ll.......ll.....')
// console.log(otherUserid,'-----------params user')
  const { user } = useSelector((state) => state.authReducer.authData)
// console.log(user._id,'---------------loged in user')
  const fetchPosts = async () => {

    if (otherUserid) {
      const { data } = await axios.get(`/post/${otherUserid}/timeline`)
        setPosts(data)
        console.log(data,'---------otheruser posts')
    }

    // if (otherUserid) {
    //   // console.log(otherUserid,'----------otherUserid')
    //   // console.log(user._id,'----------userid')
    //   // const {data} = await otherUserPosts(otherUserid)
    //   const { data } = await axios.get(`/post/${otherUserid}/timeline`)
    //   setPosts(data)
    //   console.log(data,'---------otheruser posts')
    // } 
    else {
      // const {data} = await getTimelinePosts(user._id)
      const { data } = await axios.get(`/post/${user._id}/timeline`)
      setPosts(data)
      console.log(data,'----profile posts ')
    }
  }


  const savedPost = async () => {
    const { data } = await axios.get(`/post/${user._id}/saved`)
    // setPosts(data)
    console.log(data, '--------saved posts')
  }

  useEffect(() => {
    // console.log(posts,"p")
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