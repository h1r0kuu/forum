import "./LoginStyles.css"

import { Link } from "react-router-dom"
import { useContext } from "react";

import {Context} from "../../index"

function Login() {
    const {store} = useContext(Context);

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)

        let username = form.get("username")
        let password = form.get("password")
        
        store.login(username, password)
    }

    return (
        <div className="modal-wrap">
            <div className="modal-bodies">
                <div className="modal-body modal-body-step-1 is-showing text-center">
                    <Link to={"/"}>
                        <div className="back-home">Back to home</div>
                    </Link>
                    <div className="title">Log In</div>
                    <div className="description">Hello there, Log In</div>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Username" name="username"/>
                        <input type="password" placeholder="Password" name="password"/>
                        <div className="text-center">
                            <button type="submit" className="button" style={{marginRight: "5px"}}>LOG IN</button>
                            <Link to={"/signup"}><div className="button">Create an account</div></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login