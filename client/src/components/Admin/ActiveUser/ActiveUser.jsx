import React, { useEffect, useState } from 'react'
import { getAllUsers, verifiedUser } from '../../../api/AdminRequest'
import './activeUser.css'
import { ArrowUpRightCircle } from 'tabler-icons-react';
import DataTable from 'react-data-table-component'

const ActiveUser = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [Users, setUser] = useState([])
  const [search, setSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  const getAll = async () => {
    try {
      const users = await getAllUsers()
      const verifiedUsers = users.data.filter((item)=>{
        return item.followers.length >= 5
      })
      console.log(users.data, "jjjjj")
      setUser(users.data)
      setFilteredUsers(verifiedUsers)
    } catch (error) {
      console.log(error, '----get users')
    }
  }
   const verify = async (id) => {
     await verifiedUser(id)
    getAll()
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
      name: <b>Verified</b>,
      selector: (row) => <p> {row.verified ? <ArrowUpRightCircle style={{ color: 'rgba(15, 37, 230, 0.788)' }} /> : ""}</p>,
      sortable: true,
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
      name: <b>Verify User</b>,
      cell: (row) => <button className={row.verified ? 'button' : 'Verify'} onClick={() => verify(row._id)} >{row.verified ? "Verified" : "Verify"}</button>
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
    <div className="allLoginUsers">
      
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

export default ActiveUser