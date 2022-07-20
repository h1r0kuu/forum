import { search } from "../../functions/search"
import "./FooterSearchStyles.css"

function FooterSearch() {
    return (
        <div className="footer-search">
            <div className="container">
                <div className="row">
                    <div id="custom-search-input">
                        <form onSubmit={search} className="col-md-12">
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                            <div className="input-group">
                                <input type="text" className="search-query form-control user-control30" placeholder="Search here...." name="search"/>
                                <span className="input-group-btn">
                                    <button className="btn btn-danger" type="submit">
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterSearch