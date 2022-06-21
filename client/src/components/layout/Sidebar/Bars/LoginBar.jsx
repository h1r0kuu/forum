import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../..";

function LoginBar() {
    const {store} = useContext(Context);

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)

        let username = form.get("username")
        let password = form.get("password")
        
        store.login(username, password)
    }
    return (
        <div className="login-part2389">
            <form onSubmit={onSubmit}>
                <h4>Login</h4>
                <div className="input-group300">
                    <span>
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </span>
                    <input type="text" className="namein309" placeholder="Username" name="username"/>
                </div>
                <div className="input-group300">
                    <span>
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                    <input type="password" className="passin309" placeholder="Password" name="password"/>
                </div>
                <a href="#">
                    <button type="submit" className="userlogin320">Log In</button>
                </a>
                <div className="rememberme">
                    <label>
                        <input type="checkbox" defaultChecked/>Remember Me 
                    </label>
                    <Link className="resbutton3892" to={"/register"}>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginBar