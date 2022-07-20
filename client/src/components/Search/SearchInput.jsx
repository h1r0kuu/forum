import "./SearchStyles.css"

import { Link } from "react-router-dom"
import { search } from "../../functions/search"

function SearchInput() {
    return (
        <div className="search-wrapper">
            <div className="container">
                <div className="search">
                    <form onSubmit={search}>
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-pencil-square" aria-hidden="true"></i>
                            </span>    
                            <input type="text" className="form-control search-input" placeholder="Search here..." name="search"/> 
                            <span className="input-group-addon">
                                <button type="submit" style={{backgroundColor: "transparent", border: "none"}}>
                                    <Link to={"#"}>
                                        Search
                                    </Link>
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchInput