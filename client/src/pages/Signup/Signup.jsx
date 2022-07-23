import "../Login/LoginStyles.css"

import { Link } from "react-router-dom"
import { AuthService } from "../../services/AuthService"
import { useState } from "react"

function Signup() {
    const [errors, setErrors] = useState([])

    function onSubmit(e) {
        e.preventDefault()
        let form = new FormData(e.target)

        let username = form.get("username")
        let password = form.get("password")
        let confirm_password = form.get("confirm_password")
        let image = form.get("image")
        if(password !== confirm_password) {
            console.log(password + " !== " + confirm_password)
            errors.push("Passwords don't match")
            
        }
        AuthService.registration({
            username: username,
            password: password,
            image: image
        }).then((res) => {
            console.log(res)
            // window.location.href = "/"
        }).catch(e => {
            errors.push(...e.response.data.errors)
            if(errors && errors.length > 0) {
                console.log(errors)
                errors.forEach(error => {
                    // Store.addNotification({
                    //     title: 'Error',
                    //     message: error,
                    //     type: 'danger',
                    //     container: 'bottom-left',
                    //     animationIn: ["animated", "fadeIn"],
                    //     animationOut: ["animated", "fadeOut"],
                    //     dismiss: {
                    //         duration: 5000,
                    //         onScreen: true
                    //     }
                    // })
                })
            }
            errors = []
        })
    }

    return (
        <div class="modal-wrap">
            <div class="modal-bodies">
                <div class="modal-body modal-body-step-1 is-showing text-center">
                <Link to={"/"}>
                    <div className="back-home">Back to home</div>
                </Link>
                <div class="title">Sign Up</div>
                <div class="description">Hello there, Sign up Form</div>
                <form style={{display: "flex", flexDirection: "column"}} onSubmit={onSubmit} encType={"multipart/form-data"}>
                    <input type="text" placeholder="Username*" name="username"/>
                    <input type="file" name="image"/>
                    <input type="password" placeholder="Password*" name="password"/>
                    <input type="password" placeholder="Confirm Password*" name="confirm_password"/>
                    <div>
                        <div class="row text-center sign-with">
                            <div>
                                <h3> Sign in with</h3>
                            </div>
                            <div>
                                <div>
                                    <Link to={"#"} class="facebook-btn">Facebook</Link>
                                    <Link to={"#"} class="google-btn">Google</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="button" style={{marginTop: "15px"}}>Sign Up</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Signup