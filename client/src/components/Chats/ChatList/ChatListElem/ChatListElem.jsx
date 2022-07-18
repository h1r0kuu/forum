import "./ChatListElemStyles.css"

function ChatListElem({chat, username, selectedChatId, onClick}) {

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
        <li className={"contact "+ (selectedChatId === chat.id ? "active" : "")}
            onClick={() => onClick(chat)}
        >
            <div className="wrap">
                <span className="contact-status online busy"></span>
                <img src={member.imagePath} alt="" />
                <div className="meta">
                    <p className="name">{member.username}</p>
                    <p className="preview">{chat.messages.at(-1).text}</p>
                </div>
            </div>
        </li>
    )
}

export default ChatListElem