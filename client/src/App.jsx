import "./App.css"
import "./assets/css/bootstrap.css"
import "./assets/css/font-awesome.min.css"
import "./assets/css/animate.css"

import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react"
import { Context } from "."
import { observer } from 'mobx-react-lite'

import {
  HOME,
  CREATE_POST,
  POST_DETAILS,
  USER,
  USER_COMMENTS,
  USER_HIDDEN_POSTS,
  USER_POSTS,
  CHATS,
  LOGIN,
  SIGNUP,
  SEARCH,
  ADMIN,
  ADMIN_FORUMS,
  ADMIN_POSTS,
  ADMIN_USERS,
  ADMIN_REPORTS
} from "./utils/routeConstants"

import Home from "./pages/Home/Home"
import CreatePost from "./pages/CreatePost/CreatePost"
import PostDetails from "./pages/PostDetails/PostDetails"
import Profile from "./pages/Profile/Profile"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import UserChats from "./pages/Chats/UserChats"

function App() {

  const {store} = useContext(Context);
  
  useEffect(()=> {
      if(localStorage.getItem("token")) {
        store.checkAuth(localStorage.getItem("token"))
      }
  }, [])

  return (
    <Routes>

      <Route path={HOME} element={<Home/>} />

      <Route exact path={CREATE_POST} element={<CreatePost/>} />
      <Route exact path={POST_DETAILS} element={<PostDetails/>} />

      <Route exact path={USER} element={<Profile/>} />
      <Route exact path={USER_COMMENTS} />
      <Route exact path={USER_HIDDEN_POSTS} />
      <Route exact path={USER_POSTS} />

      <Route exact path={CHATS} element={<UserChats/>} />

      <Route exact path={LOGIN} element={<Login/>} />
      <Route exact path={SIGNUP} element={<Signup/>} />

      <Route exact path={SEARCH} />

      <Route exact path={ADMIN} />
      <Route exact path={ADMIN_FORUMS} />
      <Route exact path={ADMIN_POSTS} />
      <Route exact path={ADMIN_USERS} />
      <Route exact path={ADMIN_REPORTS} />
    </Routes>
  );
}

export default observer(App)