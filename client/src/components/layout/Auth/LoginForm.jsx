import { useContext } from 'react';
import {Link} from 'react-router-dom'
import {Context} from "../../../index"

function LoginForm() {
    const {store} = useContext(Context);

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)

        let username = form.get("username")
        let password = form.get("password")
        
        store.login(username, password)
    }

    return (
        <>
            <div className="title">Log In</div>
            <div className="description">Hello there, Log In</div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Username" name="username"/>
                <input type="password" placeholder="Password" name="password"/>
                <div className="text-center">
                <button className="button">LOG IN</button>
                <Link to={"/registration"}>
                    <div className="button">Create an account</div>
                </Link>
                </div>
            </form>
        </>
    )
}

export default LoginForm