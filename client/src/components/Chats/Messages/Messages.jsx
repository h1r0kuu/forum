import InfiniteScroll from "react-infinite-scroll-component"

import Message from "./Message/Message"

import "./MessagesStyles.css"

function Messages({messages, username, loadMoreMessages, hasMore}) {
    return (
        <div className="messages"
             id="scroll"
             style={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse"
             }}
        >
            <ul>
                <InfiniteScroll
                    dataLength={15}
                    next={loadMoreMessages}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    inverse={true}
                    hasMore={hasMore}
                    loader={<p>Load</p>}
                    scrollableTarget="scroll"
                    endMessage={<p className="text-center">beginning of a chat</p>}
                >
                    {messages.map(message => (
                        <Message
                            message={message}
                            username={username}
                            key={message.id}
                        />
                    ))}                
                </InfiniteScroll>
            </ul>
        </div>
    )
}

export default Messages