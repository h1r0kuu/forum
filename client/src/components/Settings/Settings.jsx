import { useEffect, useState } from "react"
import { PROFILE } from "../../constants/profileConstants"
import { GetUser } from "../../utils/authUser"
import Account from "./Account/Account"
import UserInfo from "./UserInfo/UserInfo"

function Settings() {
    const [selectedOption, setSelectedOption] = useState(PROFILE.SETTINGS)

    const user = GetUser()

    const renderUserOption = () => {
        if(selectedOption === PROFILE.SETTINGS) {
            return (
                <UserInfo user={user}/>
            )
        }
    }

    return (
        <div className="container" style={{
            marginTop: "20px"
        }}>
            <div className="row">
                <div className="col-lg-4">
                    <Account
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        user={user}
                    />
                </div>
                <div className="col-lg-8">
                    {renderUserOption()}
                </div>
            </div>
        </div>
    )
}

export default Settings