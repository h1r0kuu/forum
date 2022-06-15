import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build";
import { Component } from "react"

const editorConfiguration = {
    // toolbar: {
    //     items: [
    //         'heading',
    //         '|',
    //         'bold',
    //         'italic',
    //         'underline',
    //         'strikethrough',
    //         'subscript',
    //         'superscript',
    //         '|',
    //         'bulletedList',
    //         'numberedList',
    //         'todoList',
    //         '|',
    //         'alignment',
    //         'outdent',
    //         'indent',
    //     ]
    // }
    ckfinder: {
        uploadUrl: "/api/v1/images/upload",
        headers: {
          'X-CSRF-TOKEN': 'CSFR-Token',
          Authorization: 'Bearer <JSON Web Token>'
        }
    }
};


function CKEditorInput({postText, setPostText}) {
    return (
        <CKEditor
            editor= {ClassicEditor}
            config={ editorConfiguration }
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ (event, editor ) => {
                const data = editor.getData();
                setPostText(data)
            } }
            onBlur={ ( event, editor ) => {
                console.log(editor.getData())
            } }
            onFocus={ ( event, editor ) => {
            } }
        />
    )
    // }
}

export default CKEditorInput