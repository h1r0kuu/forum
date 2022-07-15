import Moment from "react-moment"

function OutGoingMessage({message}) {
    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{message.text}</p>
                <span className="time_date">
                    <Moment format="HH:MM | ">{message.createdAt}</Moment>
                    <Moment fromNow >{message.createdAt}</Moment>
                </span> 
            </div>
        </div>
    )
}

export default OutGoingMessage