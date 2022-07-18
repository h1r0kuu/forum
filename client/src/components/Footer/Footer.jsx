import "./FooterStyles.css"

import { Link } from "react-router-dom"

function Footer() {
    return (
        <section className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>Copyright 2017 Ask me | <strong>Sudo  Coder</strong></p>
                    </div>
                    <div className="col-md-6">
                        <div className="footer-social">
                            <Link to={"#"}>
                                <i className="fa fa-twitter-square" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer