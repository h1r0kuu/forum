function UserInfo() {
    return (
        <form className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="account-pass">New Password</label>
                    <input className="form-control" type="password" id="account-pass"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="account-confirm-pass">Confirm Password</label>
                    <input className="form-control" type="password" id="account-confirm-pass"/>
                </div>
            </div>
            <button className="btn btn-style-1 btn-primary" type="button" data-toast="" data-toast-position="topRight" data-toast-type="success" data-toast-icon="fe-icon-check-circle" data-toast-title="Success!" data-toast-message="Your profile updated successfuly.">Update Profile</button>
        </form>
    )
}

export default UserInfo