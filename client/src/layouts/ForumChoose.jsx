import ForumListForFC from "./ForumListForFC"
import "../styles/modal.css"

function ForumChoose({openModal, setModal}) {
    return (
        <div className="modal">
            <a href="#" onClick={()=>setModal(false)}>CLOSE</a>
            <div className="modal-content">
                <h3 className="modal-title">Choose forum</h3>
                {openModal && <ForumListForFC />}
            </div>
        </div>
    )
}

export default ForumChoose