import React, { useEffect, useState } from 'react'
import { getAllUsers, verifiedUser } from '../../../api/AdminRequest'
import './activeUser.css'
import { ArrowUpRightCircle } from 'tabler-icons-react';

const ActiveUser = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const [userss, setUser] = useState([])

  const verify = async (id) => {
    const { setVerify } = await verifiedUser(id)
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
              <th>Followers</th>
              <th>Following</th>
              <th>Set Verify</th>
            </tr>
          </thead>
          {userss.map((user, i) => {
            if (user.followers.length >= 5)
              return (
                <tbody key={i}>
                  <tr>
                    <td><img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "avatar.png"} alt=""
                      className='logedUser' /></td>
                    <td>{user.firstname} {user.lastname} {user.verified ? <ArrowUpRightCircle className='verifiedUser' /> : ""}</td>
                    <td>{user.followers.length}</td>
                    <td>{user.following.length}</td>
                    <td>{user.verified === false ? <button className='button active-user' onClick={() => verify(user._id)}>Ys</button> :
                     <button className='button active-user' onClick={() => verify(user._id)}>No</button>}
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

export default ActiveUser