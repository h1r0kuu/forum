import IncomingMessage from "./IncomingMessage"
import OutGoingMessage from "./OutGoingMessage"

function MessageList({messages, username}) {
    return (
        <div className="msg_history">
            {messages.length > 0 &&
                messages.map(message => (
                    message.author.username === username
                    ?
                    <OutGoingMessage message={message} key={message.id}/>
                    :
                    <IncomingMessage message={message} key={message.id}/>
                ))
            }
        </div>
    )
}

export default MessageList