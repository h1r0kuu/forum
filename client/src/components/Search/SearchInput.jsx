import "./SearchStyles.css"

import { Link } from "react-router-dom"

function SearchInput() {
    return (
        <div className="search-wrapper">
            <div className="container">
                <div className="search">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-pencil-square" aria-hidden="true"></i></span>    
                        <input type="text" className="form-control search-input" placeholder="Ask any question and you be sure find your answer ?"/> 
                        <span className="input-group-addon">
                            <Link to={"#"}>Ask Now</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchInput