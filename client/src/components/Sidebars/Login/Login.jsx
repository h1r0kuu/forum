import "./LoginStyles.css"

import { Link } from "react-router-dom"
import { useContext } from "react";

import { Context } from "../../../index"

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
        <div className="login-sidebar">
            <h4>Login</h4>
            <form onSubmit={onSubmit}>
                <div className="input-data"> <span><i className="fa fa-user" aria-hidden="true"></i></span>
                    <input type="text" className="namein309" placeholder="Username"/>
                </div>
                <div className="input-data">
                    <span><i className="fa fa-lock" aria-hidden="true"></i></span>
                    <input type="password" className="password" placeholder="Name"/>
                </div>
                <Link to={"#"}>
                    <button type="button" className="login-btn">Log In</button>
                </Link>
                <div className="rememberme">
                    <label>
                        <input type="checkbox" defaultChecked/>Remember Me
                    </label>
                    <Link to={"/registration"} className="register-btn">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login