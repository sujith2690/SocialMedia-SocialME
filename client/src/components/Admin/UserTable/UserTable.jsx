
import React, { useEffect, useState } from 'react'
import { block, getAllUsers } from '../../../api/UserRequest'
import './userTable.css'
import { ArrowUpRightCircle } from 'tabler-icons-react';


const UserTable = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const [userss, setUser] = useState([])

  const [blocked, setBlocked] = useState(null)

  const handleBlock = async (id) => {
    const userBlocked = await block(id)
    console.log(userBlocked, '-----------block response')
    getAll()

  }

  const getAll = async () => {
    const users = await getAllUsers()
    console.log(users.data)
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
                  <td>{user.isBlock === false?
                    <button className='Nonblock' onClick={() => handleBlock(user._id)}>Non Block</button>
                  :<button className='block' onClick={() => handleBlock(user._id)}>Blocked</button>}
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