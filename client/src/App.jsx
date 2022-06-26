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
      <Route path="*" element={<Index store={store} />} />

      <Route exact path="/forums" element={<ForumList store={store} />} />
      <Route exact path="/forums/:forumId" element={<PostList store={store} />} />

      <Route exact path="/posts/create" element={<CreatePost store={store} />} />
      <Route exact path="/posts/:postId" element={<PostInfo store={store} />} />

      <Route exact path="/user/:username" element={<ProfilePage store={store} />} />
      <Route exact path="/user/:username/hidden_posts" element={<HiddenPosts store={store} />} />
     
      <Route exact path="/login" element={<Login store={store} />} />
      <Route exact path="/registration" element={<Registration store={store} />} />

      <Route exact path="/search" element={<SearchResult store={store} />} />
      
      {store.user.role === "ADMIN" &&
        <>
          <Route exact path="/admin" element={<AdminIndex store={store} />} />
          <Route exact path="/admin/forums" element={<AdminForumList store={store} />} />
          <Route exact path="/admin/posts" element={<AdminPostList store={store} />} />
          <Route exact path="/admin/users" element={<AdminUserList store={store} />} />
          <Route exact path="/admin/reports" element={<AdminReports store={store} />} />
        </>
      }
      </Routes>
    </>
  )  
}

export default observer(App);
