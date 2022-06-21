import "../../../assets/css/loginstyle.css"

import { useState } from "react"

import UserService from "../../../services/UserService"
import AuthService from "../../../services/AuthService"

function RegistrationForm() {
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
            AuthService.registration(form).then(
                window.location.href = "/"
            )
        }
    }

    return (
        <>
            <div className="title">Sign up</div>
            <div className="description">Hello there, Register form</div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Username"/>
                <input type="file" name="image"/>
                {/* <input type="email" placeholder="Email"/> */}
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Confirm password"/>
                <div className="column" style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div className="col-md-12">
                        <div className="row text-center sign-with">
                            <div className="col-md-12">
                                <h3>
                                    Sign in with
                                </h3>
                            </div>
                            <div className="col-md-12 sign-in28912">
                                <div className="btn-group btn-group-justified">
                                    <a href="#" className="btn btn-primary btn-primary3838">Facebook</a> 
                                    <a href="#" className="btn btn-danger btn-danger37883">Google</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="button">Sign Up</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default RegistrationForm