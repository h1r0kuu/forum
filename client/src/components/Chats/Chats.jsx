import { useCallback, useEffect, useState } from "react"
import { GetUser } from "../../utils/authUser"
import ChatList from "./ChatList/ChatList"
import Messages from "./Messages/Messages"

import "./ChatsStyles.css"

import { ChatService } from "../../services/ChatService"

import { Stomp } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { WEBSOCKET_URL } from "../../utils/urls"

function Chats() {
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState({})
    const [messages, setMessages] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)

    const [chatLoading, setChatLoading] = useState(true)
    const [messagesLoading, setMessagesLoading] = useState(true)

    const user = GetUser()
    const username = user.username

    useEffect(() => {
        let stompClient = Stomp.over(new SockJS(WEBSOCKET_URL))
        stompClient.debug = () => {};
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/chat/' + username, data => {
                setMessages(() => messages.concat(data))
                console.log("message after new message")
                console.log(messages)
            })
        })

    }, [username])

    useEffect(() => {
        ChatService.getUserChats(username).then(data => {
            setChats(data)
            setSelectedChat(data[0])
            setChatLoading(false)
        })
    }, [username])

    const loadMoreMessages = () => {
        if(chatLoading === false && chats.length > 0) {
            ChatService.getChatMessages(selectedChat.id, page).then(data => {
                setMessages(() => messages.concat(data.content))

                if(data.content < 15) {
                    setHasMore(false)
                }
                setPage(page + 1)
                setMessagesLoading(false)
            })
        }
    }

    useEffect(() => {
        loadMoreMessages()
    }, [selectedChat])


    function sendMessage(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        let message = form.get("message")
        ChatService.sendMessage({
            text: message,
            chat: selectedChat,
            author: user
        })
    }
    return (
        <div className="chats">
            <div className="left-side">
                <div className="profile">
                    <div className="wrap">
                        <img src={user.imagePath} className="online" alt="" />
                        <p>{user.username}</p>
                        <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="chat-search">
                    <label>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </label>
                    <input type="text" placeholder="Search contacts..." />
                </div>
                {chatLoading ? (
                    <p>Loading</p>
                ) : (
                    <ChatList 
                        chats={chats}
                        username={username}
                        setSelectedChat={setSelectedChat}
                        setMessages={setMessages}
                        selectedChat={selectedChat}
                        setPage={setPage}
                        setHasMore={setHasMore}
                    />
                )}
                <div id="bottom-bar">
                    <button id="addcontact">
                        <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>
                        <span>Add contact</span>
                    </button>
                    <button id="settings">
                        <i className="fa fa-cog fa-fw" aria-hidden="true"></i>
                        <span>Settings</span>
                    </button>
                </div>
            </div>
            <div className="content">
                {messages.length > 0 ? (
                    <>
                    <div className="contact-profile">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>Harvey Specter</p>
                    <div className="social-media">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                    </div>
                    </div>
                    {messagesLoading ? (
                        <p>Loading</p>

                    ) : (
                        <Messages
                            messages={messages}
                            username={username}
                            loadMoreMessages={loadMoreMessages}
                            hasMore={hasMore}
                        />
                    )}
                    <div className="message-input">
                        <div className="wrap">
                            <form onSubmit={sendMessage}>
                                <input type="text" placeholder="Write your message..." name="message"/>
                                    <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                                <button className="submit" type="submit">
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    </>
                ) : (
                    <p className="text-center mt-70">Messages empty</p>
                )}
            </div>
        </div>
    )
}

export default Chats