import { useState } from "react"
import AuthService from "../../services/AuthService"
import UserService from "../../services/UserService"

function Registration() {
    const [errors, setErrors] = useState([])
    async function onSubmit(e) {
        e.preventDefault()

        let form = new FormData(e.target)

        let username = form.get("username")
        let password = form.get("password")
        let confirm_password = form.get("confirm_password")
        let image = form.get("image")

        if(password !== confirm_password) {
            setErrors([...errors, "Passwords don't match"])
        }

        try {
            let user = await UserService.getUser(username)
            console.log(user)
            if(user) {
                setErrors([...errors, "User with this username already exist"])
            }
        } catch(e) {
            AuthService.registration(form)
            window.location.href="/"
        }
    }

    return (
        <form style={{
            display: "flex",
            flexDirection: "column"
        }} onSubmit={onSubmit}>
            {errors}
            <input type="text" name="username" id="username" placeholder="username" />
            <input type="password" name="password" id="password" placeholder="password" />
            <input type="password" name="confirm_password" id="confirm_password" placeholder="confirm password"/>
            <input type="file" name="image" id="image" />
            <button type="submit">Registrate</button>
        </form>
    )
}

export default Registration