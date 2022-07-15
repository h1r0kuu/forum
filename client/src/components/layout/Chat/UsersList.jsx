// import ChatUser from "../../Message/ChatUser"

function UsersList() {
    return (
        <div class="col-12 col-lg-5 col-xl-3 border-right">
            <div class="px-4 d-none d-md-block">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <input type="text" class="form-control my-3" placeholder="Search..."/>
                    </div>
                </div>
            </div>

            {/* <ChatUser/> */}

            <hr class="d-block d-lg-none mt-1 mb-0"/>
        </div>
    )
}

export default UsersList