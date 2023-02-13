
// import React, { useEffect, useState } from 'react'
// import { block, getAllUsers } from '../../../api/AdminRequest'
// import './userTable.css'
// import { ArrowUpRightCircle } from 'tabler-icons-react';


// const UserTable = () => {
//   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

//   const [userss, setUser] = useState([])
//   const handleBlock = async (id) => {
//     const userBlocked = await block(id)
//     getAll()
//   }

//   const getAll = async () => {
//     const users = await getAllUsers()
//     console.log(users.data,"jjjjj")
//     setUser(users.data)
//   }
//   useEffect(() => {
//     getAll()
//   }, [])
//   return (
//     <div className="allLoginUsers">
//       <div className='adminUsersList' >
//         <table>
//           <thead>
//             <tr>
//               <th>Profile</th>
//               <th>User Name</th>
//               <th>Email</th>
//               <th>Followers</th>
//               <th>Following</th>
//               <th>Block Status</th>
//             </tr>
//           </thead>
//           {userss.map((user, i) => {
//             return (
//               <tbody key={i}>
//                 <tr>
//                   <td><img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "avatar.png"} alt=""
//                     className='logedUser' /></td>
//                   <td>{user.firstname} {user.lastname} {user.verified ? <ArrowUpRightCircle className='verifiedUser'/>:''}</td>
//                   <td>{user.username}</td>
//                   <td>{user.followers.length}</td>
//                   <td>{user.following.length}</td>
//                   <td>
//                     <button className={user.isBlock? 'Block':'Nonblock'} onClick={() => handleBlock(user._id)}>{user.isBlock? 'Blocked' :'Block'} </button>

//                   </td>
//                 </tr>
//               </tbody>
//             )
//           })}
//         </table>
//       </div>
//     </div>
//   )
// }

// export default UserTable



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
    console.log(id, '------userid')
    const userBlocked = await block(id)
    console.log(userBlocked, '-------userBlock')
    getAll()
  }

  const getAll = async () => {
    try {
      const users = await getAllUsers()
      console.log(users.data, "jjjjj")
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