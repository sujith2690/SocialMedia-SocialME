import React from 'react'
import './FollowersCard.css'
import User from '../User/User'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllFollowUser, getAllUsers } from '../../api/UserRequest'


function FollowersCard({location}) {
//  console.log(location,"---------location-----Followers card")
  const [persons, setPersons] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData)

  useEffect(() => {
    const fetchPersons = async() => {
    if(location === "Profile"){
      const { data } = await getAllFollowUser();
      // console.log(data,'----------------getAllFollowUser')
      setPersons(data)
    }else if (location === "Home"){
      // console.log('""""""""""""""""""""""first""""""""""""""""""""""')
      const { data } = await getAllUsers();
      setPersons(data)
    }
    }
    fetchPersons()
  },[])

  
  return (
    <div className='FollowersCard'>
      <h3>People You May Know</h3>

      {persons.map((persons, id) => {
        if(persons._id !== user._id ){

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