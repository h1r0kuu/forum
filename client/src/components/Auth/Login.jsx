import { useContext } from "react";
import { Context } from "../../index";

function Login() {
    const {store} = useContext(Context);

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)

        let username = form.get("username")
        let password = form.get("password")
        
        // window.location.href = "/"
        store.login(username, password)
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="username" id="username" placeholder="Username"/>
            <input type="password" name="password" id="password" placeholder="Password"/>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login