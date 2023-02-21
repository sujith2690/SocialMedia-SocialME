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
    setFilteredUsers(reposts.data)
    setPosts(reposts.data)
  }
  const { admin } = useSelector((state) => state.authReducer.authData)
  const userId = admin._id

  useEffect(() => {
    getPosts()
  }, [])

  const handleRemove = (postId) => {
    removePost(postId, userId)
  }
  const columns = [

    {
      name: <b>Post Images</b>,
      center: true,
      selector: (row) => <p>{row.postDetails.image ? <img className='postImage' src={row.postDetails.image ? serverPublic + row.postDetails.image : ''} /> : 'No Images'}</p>
    },
    {
      name: <b>Description</b>,
      center: true,
      selector: (row) => row.postDetails.desc
    },
    {
      name: <b>Likes</b>,
      center: true,
      selector: (row) => row.postDetails.likes.length
    },
    {
      name: <b>Comments</b>,
      center: true,
      selector: (row) => row.postDetails.comments.length
    },
    {
      name: <b>Reported Users</b>,
      center: true,
      selector: (row) => row.userDetails.map((items, i) => {
        return (<li key={i} >{items.firstname}</li>)

      })
    },
    {
      name: <b>Total Reports</b>,
      selector: (row) => row.users.length,
      center: true,
    },
    {
      name: <b>Reportes</b>,
      selector: (row) => row.users.map((items, i) => {
        return (
             <li style={{listStyleType: 'none'}}>{i + 1}. {items.desc}</li>
        )

      }),
    },
    {
      name: <b>Action</b>,
      cell: (row) => <button className={row.postDetails.isRemoved ? "block" : "Nonblock"} onClick={() => handleRemove(row.postDetails._id)}>{row.postDetails.isremoved ? "Retrive" : "Remove"}</button>
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
