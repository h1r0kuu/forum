import { useEffect, useState } from "react"
import ForumService from "../../services/ForumService"

function AdminForumCreate() {
    const [forums, setForums] = useState([])
    const [parentId, setParentId] = useState(null)

    useEffect(()=>{
        ForumService.getAllForums().then( res => {
        setForums(res.data)
        })
    }, [])

    function handleSelect(e) {
        setParentId( e.target.value )
    }

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)

        let title = form.get("title")
        ForumService.create({
            title: title,
            parentId: parentId
        })
        
    }

    return (
        <form style={{display:"flex",flexDirection:"column"}} onSubmit={onSubmit}>
            <input type="text" name="title" placeholder="title"/>
            <label htmlFor="select">Parent forum</label>
            <select id="select" name="parent" onChange={handleSelect}>
                <option>Without parent</option>
                {forums.map(forum => (
                    <option value={forum.id} key={forum.id}>{forum.title}</option>
                ))}
            </select>
            <button type="submit">Create</button>
        </form>
    )
}

export default AdminForumCreate