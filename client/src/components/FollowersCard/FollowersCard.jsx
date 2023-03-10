import React from 'react'
import './FollowersCard.css'
import User from '../User/User'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllFollowUser, getUnfollowedUsers, getUser } from '../../api/UserRequest'
import { useParams } from 'react-router-dom'


function FollowersCard({ location }) {
  const [persons, setPersons] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData)
  const loginUserId = user._id
  const { id } = useParams()
  const [otherUser, setOtherUser] = useState()

  useEffect(() => {
    const fetchPersons = async () => {
      if (location === "Profile") {
        if (id) {
          const otheruser = await getUser(id)
          setOtherUser(otheruser.data.firstname)
          const { data } = await getAllFollowUser(id);
          setPersons(data)
        } else {
          const { data } = await getAllFollowUser(loginUserId);
          setPersons(data)
        }
      } else if (location === "Home") {
        try {
          const { data } = await getUnfollowedUsers(loginUserId);
          setPersons(data)
        } catch (error) {
          console.log(error, '--ERROR')
        }
      }
    }
    fetchPersons()
  }, [id])

  return (
    <div className='FollowersCard'>
      {location === 'Home' ? <h3>Follow People</h3> : <h3>{otherUser} Following People</h3>}


      {persons.map((persons, id) => {
        if (persons._id !== user._id) {

          return (
            <User location={location} person={persons} key={id} />
          )
        }
      })
      }
    </div>
  )
}


export default FollowersCard