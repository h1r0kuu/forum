import "./assets/css/style.css"
import "./assets/css/bootstrap.css"
import "./assets/css/font-awesome.min.css"

import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "./index";
import { observer } from 'mobx-react-lite'

import Index from "./views/Index";
import Login from "./views/Auth/Login";
import Registration from "./views/Auth/Registration";
import CreatePost from "./views/Posts/CreatePost";
import PostInfo from "./views/Posts/PostInfo";
import ProfilePage from "./views/User/ProfilePage";
import HiddenPosts from "./views/User/HiddenPosts";
import ForumList from "./views/Forums/ForumList";
import PostList from "./components/layout/Post/PostList";
import SearchResult from "./views/SearchResult";

import AdminIndex from "./views/Admin/AdminIndex";
import AdminForumList from "./views/Admin/AdminForumList";
import AdminPostList from "./views/Admin/AdminPostList";
import AdminUserList from "./views/Admin/AdminUserList";
import AdminReports from "./views/Admin/AdminReports";

import {
  BASE,
  FORUMS,
  FORUM,
  POST_CREATE,
  POST,
  USER,
  USER_COMMENTS,
  USER_HIDDEN_POSTS,
  LOGIN,
  REGISTRATION,
  SEARCH,
  ADMIN,
  ADMIN_FORUMS,
  ADMIN_POSTS,
  ADMIN_USERS,
  ADMIN_REPORTS
} from "./constants/routeConstants"
import UserComments from "./views/User/UserComments";

function App() {
  const {store} = useContext(Context);
  
  useEffect(()=> {
      if(localStorage.getItem("token")) {
          store.checkAuth(localStorage.getItem("token"))
      }
  }, [])

  return (
    <>
      <Routes>
        <Route path="*" element={<Index/>} />

        <Route path={BASE} element={<Index/>} />

        <Route exact path={FORUMS} element={<ForumList/>} />
        <Route exact path={FORUM} element={<PostList/>} />

        <Route exact path={POST_CREATE} element={<CreatePost/>} />
        <Route exact path={POST} element={<PostInfo/>} />

        <Route exact path={USER} element={<ProfilePage/>} />
        <Route exact path={USER_COMMENTS} element={<UserComments/>} />
        <Route exact path={USER_HIDDEN_POSTS} element={<HiddenPosts/>} />
        {!store.isAuth &&
          <>
            <Route exact path={LOGIN} element={<Login/>} />
            <Route exact path={REGISTRATION} element={<Registration/>} />
          </>
        }
        <Route exact path={SEARCH} element={<SearchResult/>} />
        
        {store.user.role === "ADMIN" &&
          <>
            <Route exact path={ADMIN} element={<AdminIndex/>} />
            <Route exact path={ADMIN_FORUMS} element={<AdminForumList/>} />
            <Route exact path={ADMIN_POSTS} element={<AdminPostList/>} />
            <Route exact path={ADMIN_USERS} element={<AdminUserList/>} />
            <Route exact path={ADMIN_REPORTS} element={<AdminReports/>} />
          </>
        }
      </Routes>
    </>
  )  
}

export default observer(App);
