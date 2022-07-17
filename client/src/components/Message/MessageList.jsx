import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "../Loader"
import IncomingMessage from "./IncomingMessage"
import OutGoingMessage from "./OutGoingMessage"

function MessageList({messages, username, loadMoreMessages, hasMore}) {
    let scrollableTarget = "msg_history"
    return (
        <div 
             id={scrollableTarget}
             className="msg_history"
             style={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse"
             }}
             >
            <InfiniteScroll
                dataLength={messages.length}
                next={loadMoreMessages}
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                inverse={true}
                hasMore={hasMore}
                loader={<Loader/>}
                scrollableTarget={scrollableTarget}
                endMessage={"beginning of a chat"}
            >
                {messages.map(message => (
                    message.author.username === username
                    ?
                    <OutGoingMessage message={message} key={message.id}/>
                    :
                    <IncomingMessage message={message} key={message.id}/>
                ))}
            
            </InfiniteScroll>
        </div>
    )
}

export default MessageList