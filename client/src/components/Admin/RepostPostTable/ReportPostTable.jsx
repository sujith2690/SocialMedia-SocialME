import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getReportedPost, removePost } from '../../../api/AdminRequest'

import './reportpostTable.css'



const ReportPostTable = () => {
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([])
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const getPosts = async () => {
    const reposts = await getReportedPost()
    console.log(reposts.data, '-------------get report')
    setPosts(reposts.data)
  }
  const { admin } = useSelector((state) => state.authReducer.authData)
  // console.log(admin,'------------admin')
  const userId = admin._id

  useEffect(() => {
    getPosts()
  }, [])

  const handleRemove = (postId) => {
    removePost(postId, userId)
    console.log(postId, userId, '-------------postid,userid at reportposttable.........')
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Post</th>
            <th>Reported User</th>
            <th>Action</th>
          </tr>
        </thead>
        {posts.map((post, i) => {
          return (
            <tbody key={i}>
              <tr>

                <td className='posimgtd'>
                  {post.postDetails.image ? <img src={serverPublic + post.postDetails.image} alt="" className='postImage' /> : ''}
                  <div>
                    <span className='descri'>Discription:</span>{ post.postDetails.desc?<p>{post.postDetails.desc}</p>:''}
                  </div>
                </td>
                <td>
                  <div className='reportUsers'>
                    <div>
                      <span className='userCount'>{post.userDetails.length} Users reported this post</span>
                    </div>
                    <span id='myBtn' onClick={() => { setShow((prev) => !prev) }}>{!show ? "Show who all reported" : "show less"}</span>

                    {show &&
                      <div id='users'>
                        {post.userDetails.map((user, index) => {
                          return (<div key={index}>{index + 1}. {user.username}</div>)
                        })
                        }
                      </div>
                    }
                  </div>

                </td>
                <td>
                  <button className={post.postDetails.isRemoved ? "block" : "Nonblock"} onClick={() => handleRemove(post.postDetails._id)}>{post.postDetails.isRemoved ? "Retrive" : "Remove"}</button>
                </td>
              </tr>
            </tbody>
          )
        })}

      </table>
    </div>
  )
}

export default ReportPostTable
