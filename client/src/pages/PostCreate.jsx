import { useParams } from "react-router-dom"
import PostService from "../services/PostService"
import Header from "../components/Header"
import CKEditorInput from "../components/CKEditorComponent";
import "../styles/post-create.css"
import { useState } from "react";

function PostCreate({store}) {
    const {forumId} = useParams()
    const [postText, setPostText] = useState('')

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

    return (
        <>
            <Header store={store} />
            <form className="post-create" onSubmit={onSubmit}>
                <input type="hidden"  name="forum" value={forumId}/>
                <div className="form-row">
                    <input type="text" name="title" id="title"/>
                    <label htmlFor="title">Title</label>
                </div>
                <CKEditorInput postText={postText} setPostText={setPostText}/>
                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default PostCreate