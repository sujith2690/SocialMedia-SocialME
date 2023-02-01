import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Home from '../../img/homes.png'
import { Bookmark } from 'tabler-icons-react';

import { userChats } from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import './chat.css'
import ChatBox from '../../components/ChatBox/ChatBox'
import { io } from 'socket.io-client'
import { MessageDots } from 'tabler-icons-react';
import { Bell } from 'tabler-icons-react';



const Chat = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const [chats, setchats] = useState([])
    const [currentChat, setcurrentChat] = useState(null)

    const socket = useRef()
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessages] = useState(null)
    const [receiveMessage, setReceiveMessages] = useState(null)

    // send message to socket server

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])


    // initialisation of socket

    useEffect(() => {
        socket.current = io('http://localhost:5000')
        socket.current.emit("new-user-add", user._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        })
    }, [user])


    // receive message from socket server

    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            console.log("data received on parent chat", data)
            setReceiveMessages(data)
        })
    }, [])

    const getChat = async () => {
        try {
            console.log("kkkkkkkk");
            const { data } = await userChats(user._id)
            setchats(data)
            console.log(data, '----chat data')
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

    return (
        <div className="Chat">
            {/* left side */}
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat, i) => (
                            <div key={i} onClick={() => setcurrentChat(chat)} >
                                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            {/* Right side */}
            <div className="Right-side-chat">
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                    <div className="navIcons">
                        <Link to={'../home'}>
                            <img className='homeimage' src={Home} alt="" />
                        </Link>
                        <Link to={'../saved'}>
                            <Bookmark />
                        </Link>

                        <Bell />
                        <Link to={'../chat'}>
                            <MessageDots />
                        </Link>
                    </div>

                    {/* chat body */}

                </div>
                <ChatBox chat={currentChat} currentUser={user._id} setSendMessages={setSendMessages}

                    receiveMessage={receiveMessage} />
            </div>
        </div>
    )
}

export default Chat