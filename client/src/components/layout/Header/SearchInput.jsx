import SearchService from "../../../services/SearchService"

function AskInput() {

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)
        
        let q = form.get("search")
        window.location.href = "/search?query=" + q
    }

    return (
        <section className="welcome-part-one">
            <div className="container">
                <div className="welcome-demop102 text-center">
                    <div className="form-style8292">
                        <form onSubmit={onSubmit}>
                            <div className="input-group"> 
                                <span className="input-group-addon">
                                    <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                </span>
                                <input type="text" className="form-control form-control8392" placeholder="Search" name="search"/> 
                                <span className="input-group-addon">
                                    <button type="submit" style={{color: "#000",background: "transparent",border:"none"}}>
                                        Search
                                    </button>
                                </span> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AskInput