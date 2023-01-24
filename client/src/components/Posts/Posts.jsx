import React from 'react'
import './Posts.css'
import Post from '../Post/Post'
import {  useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Posts({location, data,fetchPosts}) {

  let [posts,setPosts] = useState(data)
  let { loading } = useSelector((state) => state.postReducer)
  const params = useParams()
  // console.log(posts,'--------profilepost') 
  // console.log(data,'----------inside postid')
  // console.log(params.id,'-----------coming user')
  useEffect(()=>{
    
  setPosts(data)
  },[data])
  
  if (!posts) return "no posts";
   if (params.id) posts = posts.filter((post) => post.userId === params.id)
  //  console.log(posts,'--------------------------------------------------')
  return (
    <div className="Posts">

      {loading ? "Fetching posts..." :
        posts.map((post, id) => {
          return <Post location='saved' data={post} fetchpost={fetchPosts} key={id} />
        })}
    </div>
  )
}

export default Posts