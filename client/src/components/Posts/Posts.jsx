import React from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function Posts({ location, data, fetchPosts }) {
  let [posts, setPosts] = useState(data)
  let { loading } = useSelector((state) => state.postReducer)
  const params = useParams()
  useEffect(() => {
    setPosts(data)
  }, [data])

  if (!posts) return "no posts";
  if (params.id) {
    console.log(params.id, 'dfg')
    console.log(posts, 'hhhhh++++++++++++++++++++++++++')
    posts = posts.filter((post) => post.userId === params.id)
  }
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