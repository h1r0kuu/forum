import "../../assets/css/loginstyle.css"
import LoginForm from '../../components/layout/Auth/LoginForm'

function Login() {
    return (
        <div className="modal-wrap">
            <div className="modal-bodies">
                <div className="modal-body modal-body-step-1 is-showing">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login