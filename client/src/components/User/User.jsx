import "./UserStyles.css"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserService } from "../../services/userService";

import { PROFILE } from "../../enums/profileEnums";

import AboutUser from "./AboutUser/AboutUser";
import UserStats from "./UserStats/UserStats";

import UserHiddenPosts from "./UserHiddenPosts/UserHiddenPosts"
import Following from "./Following/Following"
import Comments from "./Comments/Comments";
import UserPostList from "./UserPostList/UserPostList";


function User() {
    const {username} = useParams()
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [selectedOption, setSelectedOption] = useState(PROFILE.HIDDEN_POSTS)

    const renderSelectedOption = () => {
        if(selectedOption === PROFILE.HIDDEN_POSTS) {
            return (
                <UserHiddenPosts user={user}/>
            )
        } else if(selectedOption === PROFILE.COMMENTS) {
            return (
                <Comments user={user}/>
            )
        } else if(selectedOption === PROFILE.POSTS) {
            return (
                <UserPostList user={user}/>
            )
        } else if(selectedOption === PROFILE.FOLLOWING) {
            return (
                <Following user={user}/>
            )
        } 
    }
    useEffect(()=> {
        UserService.getUser(username).then( data => {
            setUser(data)
            setLoading(false)
        })
    }, [username])

    return (
        <>
            {isLoading ? (
                <p>Loading</p>
            ) : (
                <>
                    <AboutUser user={user}/>
                    <UserStats 
                        user={user}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />
                    <div className="option">
                        {
                            renderSelectedOption()
                        }
                    </div>
                </>
            )}
        </>
    )
}

export default User