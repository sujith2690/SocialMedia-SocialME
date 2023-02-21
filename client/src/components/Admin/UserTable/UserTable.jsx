
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

import { block, getAllUsers } from '../../../api/AdminRequest'
import './userTable.css'
import { ArrowUpRightCircle } from 'tabler-icons-react';

const UserTable = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [Users, setUser] = useState([])
  const [search, setSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  const handleBlock = async (id) => {
    const userBlocked = await block(id)
    getAll()
  }

  const getAll = async () => {
    try {
      const users = await getAllUsers()
      setUser(users.data)
      setFilteredUsers(users.data)
    } catch (error) {
      console.log(error, '----get users')
    }
  }

  const columns = [
    {
      name: <b>User Name</b>,
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: <b>Profile</b>,
      selector: (row) => <img className='userProfile' src={row.profilePicture ? serverPublic + row.profilePicture : serverPublic + "avatar.png"} />
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.username
    },
    {
      name: <b>Followers</b>,
      selector: (row) => row.followers.length
    },
    {
      name: <b>Following</b>,
      selector: (row) => row.following.length
    },
    {
      name: <b>Block Action</b>,
      cell: (row) => <button className={row.isBlock ? 'Block' : 'button'} onClick={() => handleBlock(row._id)} >{row.isBlock ? "Unblock" : "Block"}</button>
    },
    
  ]

  useEffect(() => {
    getAll()
  }, [])

  useEffect(() => {
    const results = Users.filter((user) => {
      return user.firstname.toLowerCase().match(search.toLowerCase())
    });
    setFilteredUsers(results)
  }, [search])

  return (
    <div className='usertable'>
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
    </div>)
}

export default UserTable