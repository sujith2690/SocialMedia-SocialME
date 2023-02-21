import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Home from '../../img/homes.png'
import { Bookmark } from 'tabler-icons-react';

import { createChat, userChats } from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import './chat.css'
import ChatBox from '../../components/ChatBox/ChatBox'
import { io } from 'socket.io-client'
import { MessageDots } from 'tabler-icons-react';
import { UserCircle } from 'tabler-icons-react';
import { Logout } from 'tabler-icons-react';
import { logOut } from '../../Actions/AuthAction';
import { searchUser } from '../../api/UserRequest';
import { UilSearch } from '@iconscout/react-unicons'

const Chat = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const [chats, setchats] = useState([])
    const [currentChat, setcurrentChat] = useState(null)
    const navigate = useNavigate()
    const socket = useRef()
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessages] = useState(null)
    const [receiveMessage, setReceiveMessages] = useState(null)
    const dispatch = useDispatch();
    const [show, setshow] = useState(false)
    const [Result, setResult] = useState([])

    const senderId = user._id
    // send message to socket server

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])


    // initialisation of socket

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_BASE_URL)
        socket.current.emit("new-user-add", user._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        })
    }, [user])


    // receive message from socket server

    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            setReceiveMessages(data)
        })
    }, [])

    const getChat = async () => {
        try {
            const { data } = await userChats(user._id)
            setchats(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getChat()
    }, [user])

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id)
        const online = onlineUsers.find((user) => user.userId === chatMember)
        return online ? true : false
    }
    const handleLogOut = () => {
        dispatch(logOut())
    }
    const desc = useRef()
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
            reset()
        } else {
            if (show === true) {
                setshow(false)
            }
        }
    }
    const handleChat = async (receiverId) => {
      const userChat =  await createChat({ senderId, receiverId })
            setcurrentChat(userChat.data)
            if (show === true) {
                setshow(false)
            }
            const { data } = await userChats(user._id)
            setchats(data)
    }
    return (
        <div className="Chat">
            {/* left side */}
            <div className="Left-side-chat">

                <div className="Chat-container">
                    <form action="" onSubmit={search}>
                        <div className="search">
                            <input type="text" className='textbox' placeholder='Search User' ref={desc} />
                            <UilSearch className='s-icons' onClick={search} />
                        </div>
                    </form>
                    {show === true ?
                        <div className='searchoutput' style={{ padding: '5px' }}>
                            {Result.map((item, i) => {
                                return (
                                    <div className='resultlocation' key={i} style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleChat(item._id)}  >
                                        <img className="SearchProfile" src={item.profilePicture ? serverPublic + item.profilePicture : serverPublic + "avatar.png"} alt="" />
                                        <p style={{ marginLeft: '10px', marginTop: 10, fontSize: 12, color: 'white' }} >
                                            {item.firstname} {item.lastname}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        : ''}
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat, i) => (
                            <div  key={i} onClick={() => setcurrentChat(chat)} >
                                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            {/* Right side */}
            <div className="Right-side-chat">
                <div className='naviconns' style={{ width: '20rem', alignSelf: 'flex-end' }}>

                    <div className="navIcons">
                        <div>
                            <img className='homeimage' src={Home} alt="" onClick={() => navigate('/home')} />
                        </div>
                        <div>
                            <Bookmark style={{ cursor: 'pointer' }} onClick={() => navigate('/saved')} />
                        </div>
                        <div>
                            <MessageDots onClick={() => navigate('/chat')} />
                        </div>
                        <div>
                            <UserCircle onClick={() => navigate(`/profile/${user._id}`)} />
                        </div>
                        <div>
                            <Logout onClick={handleLogOut} />
                        </div>
                    </div>
                </div>
                <ChatBox chat={currentChat} currentUser={user._id} setSendMessages={setSendMessages}

                    receiveMessage={receiveMessage} />
            </div>
        </div>
    )
}

export default Chat