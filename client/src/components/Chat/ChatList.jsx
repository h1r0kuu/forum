import Chat from "./Chat"

function ChatList({chats, username, setSelectedChat, setMessages, selectedChatId}) {

    function selectChat(chat) {
        setSelectedChat(chat)
        setMessages(chat.messages)
    }

    return (
        <div className="inbox_chat">
            {chats.map(chat => (
                <Chat onClick={selectChat}
                      chat={chat}
                      lastMessage={chat.messages.at(-1)}
                      username={username}
                      selectedChatId={selectedChatId} 
                      key={chat.id}/>                
            ))}
        </div>
    )
}

export default ChatList