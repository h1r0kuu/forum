import { useEffect, useState } from "react"
import ForumService from "../../../services/ForumService"
import PostService from "../../../services/PostService"

import CKEditorInput from "../../CKEditorComponent"

function PostCreateForm({store}) {
    const [postText, setPostText] = useState('')
    const [forums, setForums] = useState([])
    
    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        
        let title = form.get("title")
        let forumId = form.get("forum")
        PostService.create({
            "title": title,
            "text": postText,
            "forum": {"id":forumId},
            "creator": {...store.user}
        }, (res)=> {
            window.location.href = '/posts/' + res.data.id
        })

    }

    useEffect( ()=> {
        ForumService.getAllForums(true).then(res => {
            setForums(res.data)
        })
    }, [])

    return (
        <>
        <div className="ask-question-input-part032">
            <h4>Ask Question</h4>
            <hr/>
            <form onSubmit={onSubmit}>
                <div className="question-title39">
                    <span className="form-description433">Question-Title* </span>
                    <input type="text" name="title" className="question-ttile32" placeholder="Write Your Question Title" />
                </div>
                <div className="categori49">
                    <span className="form-description43305">Forum* </span>
                    <select id="forum" name="forum">
                        {forums.map(forum => (
                            <option value={forum.id} key={forum.id}>{forum.title}</option>
                        ))}
                    </select>
                </div>
                <div className="details2-239">
                    <div className="col-md-12 nopadding"style={{minHeight: "200px"}}>
                        <CKEditorInput id={"txtEditor"} postText={postText} setPostText={setPostText}/>
                    </div>
                </div>
            <div className="publish-button2389">
                <button type="submit" className="publis1291">Publish your Question</button>
            </div>
            </form>

        </div>
        </>
    )
}

export default PostCreateForm