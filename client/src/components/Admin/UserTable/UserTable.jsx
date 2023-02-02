
import React, { useEffect, useState } from 'react'
import { block, getAllUsers } from '../../../api/AdminRequest'
import './userTable.css'
import { ArrowUpRightCircle } from 'tabler-icons-react';


const UserTable = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const [userss, setUser] = useState([])
  const handleBlock = async (id) => {
    const userBlocked = await block(id)
    getAll()

  }

  const getAll = async () => {
    const users = await getAllUsers()
    console.log(users.data,"jjjjj")
    setUser(users.data)
  }
  useEffect(() => {
    getAll()
  }, [])
  return (
    <div className="allLoginUsers">
      <div className='adminUsersList' >
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Followers</th>
              <th>Following</th>
              <th>Block Status</th>
            </tr>
          </thead>
          {userss.map((user, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td><img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "avatar.png"} alt=""
                    className='logedUser' /></td>
                  <td>{user.firstname} {user.lastname} {user.verified ? <ArrowUpRightCircle/>:''}</td>
                  <td>{user.username}</td>
                  <td>{user.followers.length}</td>
                  <td>{user.following.length}</td>
                  <td>
                    <button className={user.isBlock? 'Block':'Nonblock'} onClick={() => handleBlock(user._id)}>{user.isBlock? 'Blocked' :'Block'} </button>
                  
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default UserTable