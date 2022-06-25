import "../assets/css/style.css"
import ReportService from "../services/ReportService"

function ReportModal({objId, objType, setModal, store}) {
    console.log(objType)
    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        let reason = form.get("text")
        let user = store.user
        ReportService.create({text: reason,entity: objType, objectId: objId, user: user}, (res) => {
            setModal(false)
            alert("Your report succesffuly sended")
        })
    }

    return (
        <div className="modal">
            <div className="close-modal" onClick={()=>setModal(false)}>x</div>
            <div className="content" onSubmit={onSubmit}>
                <form>
                    <textarea name="text" cols="30" rows="10" placeholder="write the reason of report"></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default ReportModal