import React, { useEffect } from 'react'
import UserTable from '../UserTable/UserTable'
import ReportPostTable from '../RepostPostTable/ReportPostTable'
import ActiveuserTable from '../ActiveUser/ActiveUser'
import './admincontrols.css'

const AdminControls = ({ select }) => {
  useEffect(() => {
  }, [select])

  return (
    <div className="adminControlls">

      {select == "users" ? < UserTable/> : ''}
      {select == "activeUsers" ? <ActiveuserTable className='verifiedUser' /> : ''}
      {select == "report" ? <ReportPostTable /> : ''}
      <div>

      </div>

    </div>
  )
}

export default AdminControls