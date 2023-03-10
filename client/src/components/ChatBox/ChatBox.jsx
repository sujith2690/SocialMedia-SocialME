import React, { useEffect, useRef, useState } from 'react'
import './chatbox.css'
import { getUser } from '../../api/UserRequest'
import { addMessage, getMessages } from '../../api/MessageRequest'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import Logo from '../../img/hlogo.png'
import { useNavigate } from 'react-router-dom'

const ChatBox = ({ chat, currentUser, setSendMessages, receiveMessage }) => {
    const [userData, setuserData] = useState(null)
    const [messages, setmessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const navigate = useNavigate()
    const scroll = useRef()

    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setmessages([...messages, receiveMessage])
        }
    }, [receiveMessage])

    // fetching data for the header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setuserData(data)
            } catch (error) {
                console.log(error)
            }

        }
        if (chat !== null) getUserData()
    }, [chat, currentUser])

    // Fetching data for messages

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)
                setmessages(data)

            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) fetchMessages()
    }, [chat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }
    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }

        // send Message to datatbase
        try {
            const { data } = await addMessage(message)
            setmessages([...messages, data])
            setNewMessage("")
        } catch (error) {

        }
        // send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUser);
        setSendMessages({ ...message, receiverId })
    }

    // Always Scroll to the last message

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (

        <div className="ChatBox-container">
            {chat ? (
                <>
                    <div className="chat-header">
                        <div className="userHead" style={{display:'flex',justifyContent:'space-between'}}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={userData?.profilePicture ?
                                    process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture :
                                    process.env.REACT_APP_PUBLIC_FOLDER + "avatar.png"} alt=""
                                    className='followerImage'
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <div className="name" style={{ fontSize: '0.8rem',marginLeft:'10px' }}>
                                    <span>{userData?.firstname} {userData?.lastname}</span>
                                </div>
                            </div>
                            <div style={{cursor:'pointer'}} onClick={() => navigate('/home')}><img src={Logo} alt=""  /></div>
                        </div>
                        <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
                    </div>
                    {/* chatbox Messages */}
                    <div className="chat-body">
                        {messages.map((message) => (
                            <>
                                <div ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}>
                                    <span>{message.text}</span>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            </>
                        ))}
                    </div>
                    {/* chat sender */}
                    <form  onSubmit={handleSend} >
                        <div className="chat-sender">
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <button type='submit' className="send-button button">Send</button>
                        </div>
                    </form>
                    
                </>
            ) : (
                <span className='chatbox-empty-message'>Tap on a Chat to start Conversation... </span>
            )}

        </div>

    )
}

export default ChatBox