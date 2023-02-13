import React from 'react'
import './admincommands.css'
import { UserExclamation } from 'tabler-icons-react';
import { UserCheck } from 'tabler-icons-react';
import { FileReport } from 'tabler-icons-react';
import { Logout } from 'tabler-icons-react';
import { logOut } from '../../../Actions/AuthAction';
import { useDispatch } from 'react-redux';
import { Accessible } from 'tabler-icons-react';
import Logo from '../../../img/hlogo.png'
import { HomeCheck } from 'tabler-icons-react';
import { UserCircle } from 'tabler-icons-react';
import Menu from '../../Menu/Menu';



const AdminCommands = ({ setSelect }) => {

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className='Leftbar'>
      <div className='adminOptioins'>
        <div className='iconss' onClick={() => setSelect("users")} >
          <UserExclamation />
          <p>All users</p>
        </div>
        <div className='iconss' onClick={() => setSelect("activeUsers")}>
          <UserCheck />
          <p>Verified users</p>
        </div>
        <div className='iconss' onClick={() => setSelect("report")}>
          <FileReport />
          <p>Reported Posts</p>
        </div>
        <div className='iconss' onClick={handleLogOut} >
          <Logout />
          <p>Logout</p>
        </div>
      </div>

      {/* <nav className='bab'>
        <ul>
          <li>
            <a href="" className='logos'>
              <img src={Logo} alt="" />
              <span className='nav-item'>SocialME</span>
            </a>
          </li>
          <li>
            <a href=""className='atag'>
            <HomeCheck className='adicon' />
            <span className='nav-item'>Home</span>
            </a>
          </li>
          <li>
            <a href=""className='atag'>
            <UserCircle className='adicon' />
            <span className='nav-item'>Users</span>
            </a>
          </li>
          <li>
            <a href=""className='atag'>
            <UserCheck className='adicon' />
            <span className='nav-item'>Verify</span>
            </a>
          </li>
          <li>
            <a href="" className='atag'>
            <FileReport className='adicon' />
            <span className='nav-item'>Reports</span>
            </a>
          </li>
          <li>
            <a href="" className='logout atag'>
            <Logout className='adicon' />
            <span className='nav-item'>Logout</span>
            </a>
          </li>

        </ul>
      </nav> */}



    </div>
  )
}

export default AdminCommands