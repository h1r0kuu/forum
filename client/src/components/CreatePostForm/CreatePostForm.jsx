import "./CreatePostFormStyles.css"

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import { PostService } from "../../services/postService";
import { ForumService } from "../../services/forumService";
import { GetUser } from "../../utils/authUser";

function CreatePostForm() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [uploadedImages, setUploadedImages] = useState([])
    const [postText, setPostText] = useState('')


    const [forums, setForums] = useState([])
    // const [errors, setErrors] = useState([])
    const user = GetUser()
    
    
    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        
        let title = form.get("title")
        let forumId = form.get("forum")
        PostService.create({
            "title": title,
            "text": postText,
            "forum": {"id":forumId},
            "creator": {...user}
        }).then(data => {
            window.location.href = '/posts/' + data.id
        }).catch(e => {
            const errors = e
            console.log(e)
            if(errors.length > 0) {
                errors.forEach(error => {
                    // Store.addNotification({
                    //     title: 'Error',
                    //     message: error,
                    //     type: 'danger',
                    //     container: 'bottom-left',
                    //     animationIn: ["animated", "fadeIn"],
                    //     animationOut: ["animated", "fadeOut"],
                    //     dismiss: {
                    //         duration: 5000,
                    //         onScreen: true
                    //     }
                    // })
                })
            }
        })
    }

    useEffect( ()=> {
        ForumService.getAllForums(true).then(data => {
            setForums(data)
        })
    }, [])

    function uploadImageCallBack(file) {
        var urlCreator = window.URL || window.webkitURL;
        const imageObject = {
          file: file,
          localSrc: urlCreator.createObjectURL(file),
        }
        setUploadedImages(imageObject => [...uploadedImages, imageObject])
        
        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
          }
        );
    }

    const onEditorStateChange = editorState => {
        setEditorState(editorState)
        const currentContent = editorState.getCurrentContent();
        const contentRaw = convertToRaw(currentContent);
        const value = currentContent.hasText() ? draftToHtml(contentRaw) : "";
        setPostText(value)
    };

    return (
        <div className="create-post">
            <h4>Ask Question</h4>
            <hr/>
            <form onSubmit={onSubmit}>
                <div className="post-title">
                    <span className="title">Post-Title* </span>
                    <input type="text" name="title" className="title_input" placeholder="Write Your Question Title"/>
                </div>
                <div className="forums">
                    <span className="forums_title">Forum* </span>
                    <label>
                        <select id="forum" name="forum" className="forum_item" >
                            {forums.map(forum => (
                                <option value={forum.id} key={forum.id}>{forum.title}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div style={{
                    marginTop: "30px"
                }}>
                    <div className="col-md-12 nopadding">
                        <Editor
                            editorState={editorState}
                            toolbarclassNameName="menuBarDiv"
                            editorclassNameName="Editor-editor"
                            onEditorStateChange={onEditorStateChange}
                            toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                                image: { uploadCallback: uploadImageCallBack, previewImage: true },
                                inputAccept: 'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
                            }}
                        />
                    </div>
                </div>
                <div className="create">
                    <button type="submit" className="create-btn">Create post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePostForm