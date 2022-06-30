import { ReactNotifications } from "react-notifications-component"
import "../../assets/css/loginstyle.css"
import RegistrationForm from "../../components/layout/Auth/RegistrationForm"

function Registration() {
    return (
        <>
        <ReactNotifications/>
        <div className="modal-wrap">
            <div className="modal-bodies">
                <div className="modal-body modal-body-step-1 is-showing">
                    <RegistrationForm />
                </div>
            </div>
        </div>
        </>
    )
}

export default Registration