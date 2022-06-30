import "../../../assets/css/loginstyle.css"

import { useState } from "react"

import UserService from "../../../services/UserService"
import AuthService from "../../../services/AuthService"
import { Store } from "react-notifications-component"

function RegistrationForm() {
    let errors = []
    
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
                    Store.addNotification({
                        title: 'Error',
                        message: error,
                        type: 'danger',
                        container: 'bottom-left',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    })
                })
            }
            errors = []
        })
    }

    return (
        <>
            <div className="title">Sign up</div>
            <div className="description">Hello there, Register form</div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Username" name="username"/>
                <input type="file" name="image"/>
                {/* <input type="email" placeholder="Email"/> */}
                <input type="password" placeholder="Password" name="password"/>
                <input type="password" placeholder="Confirm password" name="confirm_password"/>
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