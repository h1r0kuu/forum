import { useParams } from "react-router-dom"
import PostService from "../services/PostService"
import Header from "./Header"
import CKEditorInput from "../components/CKEditorComponent";

function PostCreate() {
    const {forumId} = useParams()

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        
        let title = form.get("title")
        let text = form.get("text")
        let forumId = form.get("forum")
        PostService.create({
            "title": title,
            "text": text,
            "forum": {"id":forumId}
        }, (res)=> {
            window.location.href = '/posts/' + res.data.id
        })

    }

    return (
        <>
            <Header />
            <form className="post-create" onSubmit={onSubmit}>
                <input type="hidden"  name="forum" value={forumId}/>
                <div className="form-row">
                    <input type="text" name="title" id="title"/>
                    <label htmlFor="title">Title</label>
                </div>
                <CKEditorInput/>
                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default PostCreate