import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build";
import { Component } from "react"




class CKEditorInput extends Component {
    render() {
        return (
            <CKEditor
                editor= {ClassicEditor}
                // config={ editorConfiguration }
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        )
    }
}

export default CKEditorInput