import React, { useRef, useState } from 'react'
import Logo from '../../img/hlogo.png'
import { UilSearch } from '@iconscout/react-unicons'
import './LogoSearch.css'
import axios from 'axios'
import { searchUser } from '../../api/AuthRequest'
import { Link } from 'react-router-dom'

function LogoSearch() {

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const desc = useRef()
  const [Result, setResult] = useState([])
  const [show, setshow] = useState(false)
  // console.log(Result, '---------restt')
  const reset = () => {
    desc.current.value = ""
  }
  const search = async (e) => {
    if (desc.current.value) {
      if (show === false) {
        setshow(true)
      }
      e.preventDefault()
      const userdis = {
        desc: desc.current.value
      }
      const response = await searchUser(userdis)
      const userDetails = response.data
      setResult(userDetails)
      console.log(userDetails, "------response goted")
      reset()
    } else {
      if (show === true) {
        setshow(false)
      }
    }
  }

  return (
    <div className="LogoSearch">
      <form  onSubmit={search}>
        <div style={{ display: 'flex' }}>
          <img src={Logo} alt="" />
          <div className="Search">
            <input type="text" required ref={desc} placeholder='#Explore' />
            <div className="s-icon">
              <UilSearch onClick={search} />
            </div>
          </div>
        </div>
      </form>
      {show === true ?
        <div className='searchoutput'>
          {Result.map((item, i) => {
            return (
              <div className='resultlocation' key={i} >
                <img className="SearchProfile" src={item.profilePicture ? serverPublic + item.profilePicture : serverPublic + "avatar.png"} alt="" />
                <span style={{ marginLeft: '10px', marginTop: 10 }} >
                  <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${item._id}`}>
                    <b>{item.firstname} {item.lastname}</b>
                  </Link>
                </span>
              </div>
            )
          })}
        </div>
        : ''}


    </div>
  )
}

export default LogoSearch