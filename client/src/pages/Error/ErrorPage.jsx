import React from 'react'
import { useNavigate } from 'react-router-dom'
import './error.css'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className='errorPage'>
      <p>SocialME<span style={{ fontSize: 100 }}>404</span> <span>Error</span></p>
      <p>Goto <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span></p>

    </div>
  )
}

export default ErrorPage