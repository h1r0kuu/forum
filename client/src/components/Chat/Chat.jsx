import Moment from "react-moment"

function Chat({chat, lastMessage, selectChat, username, selectedChatId, onClick}) {

    const member = (() => {
        let chatMember = null
        for(let user of chat.users) {
            if(user.username !== username) {
                chatMember = user
                break
            }
        }
        return chatMember
    })()

    return (
        <div className={"chat_list " + (selectedChatId === chat.id ? "active_chat" : "")} onClick={()=>onClick(chat)}>
            <div className="chat_people">
                <div className="chat_img"> <img src={member.imagePath} alt={member.username}/> </div>
                <div className="chat_ib">
                <h5>{member.username}
                    <span className="chat_date">
                        <Moment format="MMM DD">{lastMessage.createdAt}</Moment>
                    </span>
                </h5>
                <p>{lastMessage.text.slice(0,10)}</p>
                </div>
            </div>
        </div>
    )
}
export default Chat