import "../../../assets/css/style.css"
import ChatService from "../../../services/ChatService"
import UserService from "../../../services/UserService"
import { GetUser } from "../../../utils/UserUtil"

function SendMessageModal({setModal,username}) {
    let user = GetUser()
    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)

        let text = form.get("text")
        ChatService.create({
            usernames: [ user.username, username ]
        }).then(res => {
            ChatService.sendMessage({
                text: text,
                chat: res.data,
                author: user
            })
        })
    }
    return (
        <div className="modal">
            <div className="close-modal" onClick={()=>setModal(false)}>x</div>
            <div className="content">
                <form onSubmit={onSubmit}>
                    <textarea name="text" cols="30" rows="10" placeholder="write the message"></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default SendMessageModal