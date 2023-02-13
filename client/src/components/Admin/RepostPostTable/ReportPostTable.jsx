import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getReportedPost, removePost } from '../../../api/AdminRequest'
import DataTable from 'react-data-table-component'

import './reportpostTable.css'



const ReportPostTable = () => {
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([])
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const [Users, setUser] = useState([])
  const [search, setSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  const getPosts = async () => {
    const reposts = await getReportedPost()
    console.log(reposts.data, '-------------get report')
    setFilteredUsers(reposts.data)
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
  const columns = [
    
    {
      name: <b>Post Images</b>,
      selector: (row) => <p>{row.postDetails.image ?<img className='postImage' src={row.postDetails.image ? serverPublic + row.postDetails.image :''} />: 'No Images'}</p>
    },
    {
      name: <b>Description</b>,
      selector: (row) => row.postDetails.desc
    },
    {
      name: <b>Likes</b>,
      selector: (row) => row.postDetails.likes.length
    },
    {
      name: <b>Comments</b>,
      selector: (row) => row.postDetails.comments.length
    },
    {
      name: <b>Reported Users</b>,
      selector: (row) => row.userDetails.map((items,i)=>{
        return (<li key={i} >{items.firstname}</li>)
        
      })
    },
    {
      name: <b>Reported Comments</b>,
      selector: (row) => row.users.map((items,i)=>{
        return (<li key={i} >{items.desc}</li>)
        
      })
    },

    {
      name: <b>Action</b>,
      cell: (row) => <button className={row.postDetails.isRemoved ? "block" : "Nonblock"} onClick={() => handleRemove(row.postDetails._id)}>{row.postDetails.isremoved ? "Retrive" : "Remove"}</button>
      // <button className={row.isBlock ? 'Block' : 'button'} onClick={() => handleRemove(row._id)} >{row.isBlock ? "Unblock" : "Block"}</button>
    },
    
  ]

  return (
    <div className='repostPosts'>
     
      <DataTable
        className='sixze'
        columns={columns}
        data={filteredUsers}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='390px'
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input type='text' className='userSearch' placeholder='Search User'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }


      />
    </div>
  )
}

export default ReportPostTable
