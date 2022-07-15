import { useEffect, useState } from "react"
import Moment from "react-moment"
import "../../../assets/css/chat.css"
import ChatService from "../../../services/ChatService"
import { GetUser } from "../../../utils/UserUtil"
import MessageList from "../../Message/MessageList"
import ChatList from "../../Chat/ChatList"
// import UsersList from "./UsersList"

function Chats() {
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState({})
    const [messages, setMessages] = useState([])

    const user = GetUser()
    const username = user.username
    useEffect(() => {
        ChatService.getUserChats(username).then(res => {
            const resChats = res.data
            setChats(resChats)
            if(resChats.length > 0) {
                setSelectedChat(resChats[0])
                setMessages(resChats[0].messages)
            }
        })
    }, [])

    function sendMessage(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        let message = form.get("message")
        ChatService.sendMessage({
            text: message,
            chat: selectedChat,
            author: user
        }).then(res => {
            setMessages([...messages, res.data])
        })
    }

    return (
        <div className="container">
            <h3 className=" text-center">Messaging</h3>
            <div className="messaging">
                <div className="inbox_msg">
                    <div className="inbox_people">
                    <div className="headind_srch">
                        <div className="recent_heading">
                        <h4>Recent</h4>
                        </div>
                        <div className="srch_bar">
                        <div className="stylish-input-group">
                            <input type="text" className="search-bar"  placeholder="Search"/>
                            <span className="input-group-addon">
                            <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                            </span> </div>
                        </div>
                    </div>
                    {chats.length > 0 &&
                    <ChatList chats={chats}
                              username={user.username}
                              setSelectedChat={setSelectedChat}
                              setMessages={setMessages}
                              selectedChatId={selectedChat.id}/>
                    }
                    </div>
                    <div className="mesgs">
                        {messages.length > 0 &&
                            <MessageList messages={messages} username={user.username}/>
                        }
                        <div className="type_msg">
                            <div className="input_msg_write">
                            <form onSubmit={sendMessage}>
                                <input type="text" className="write_msg" placeholder="Type a message" name="message" />
                                <button className="msg_send_btn" type="submit"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats