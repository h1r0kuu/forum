export const search = (e) => {
    e.preventDefault()
    let form = new FormData(e.target)
    
    let q = form.get("search")
    window.location.href = "/search?query=" + q
}