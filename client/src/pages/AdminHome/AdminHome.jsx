import React, { useState } from 'react'
import AdminCommands from '../../components/Admin/AdminCommands/AdminCommands'
import AdminControls from '../../components/Admin/AdminControls/AdminControls'
import Navbar from '../../components/Admin/Navbar/Navbar'
import './AdminHome.css'

const AdminHome = () => {
  const [select, setSelect] = useState('users')


  return (
    <div className='adminHome'>
      <Navbar />
      <div className='controllers' style={{display:'flex',alignItems:'center'}}>
        <AdminCommands  setSelect={setSelect} />
        <AdminControls select={select} />
      </div>
    </div>
  )
}

export default AdminHome