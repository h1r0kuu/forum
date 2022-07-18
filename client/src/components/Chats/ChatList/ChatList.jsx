import "./ChatListStyles.css"

import ChatListElem from "./ChatListElem/ChatListElem"

function ChatList({chats, username, setSelectedChat, setHasMore, setMessages, setPage, selectedChatId}) {

    function selectChat(chat) {
        setSelectedChat(chat)
        setPage(0)
        setMessages([])
        setHasMore(true)
    }

    return (
        <div className="contacts">
            <ul style={{
                flexDirection: "column"
            }}>
                {chats.map(chat => (
                    <ChatListElem
                        onClick={selectChat}
                        chat={chat}
                        lastMessage={chat.messages.at(-1)}
                        username={username}
                        selectedChatId={selectedChatId} 
                        key={chat.id}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ChatList