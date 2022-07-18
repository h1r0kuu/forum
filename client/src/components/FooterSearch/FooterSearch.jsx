import "./FooterSearchStyles.css"

function FooterSearch() {
    return (
        <div className="footer-search">
            <div className="container">
                <div className="row">
                    <div id="custom-search-input">
                        <div className="input-group col-md-12"> <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                            <input type="text" className="search-query form-control user-control30" placeholder="Search here...." />
                            <span className="input-group-btn">
                                <button className="btn btn-danger" type="button">
                                    <span className="glyphicon glyphicon-search"></span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterSearch