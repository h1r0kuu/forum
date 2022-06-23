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
import ForumList from "./views/Forums/ForumList";
import PostList from "./components/layout/Post/PostList";
import SearchResult from "./views/SearchResult";
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

      <Route exact path="/login" element={<Login store={store} />} />
      <Route exact path="/registration" element={<Registration store={store} />} />

      <Route exact path="/search" element={<SearchResult store={store} />} />
      
      {/* {store.user.role === "ADMIN" &&
        <>
          <Route exact path="/admin" element={<AdminIndex store={store} />} />
          <Route exact path="/admin/forums" element={<AdminForums store={store} />} />
          <Route exact path="/admin/posts" element={<AdminPosts store={store} />} />
          <Route exact path="/admin/users" element={<AdminUsers store={store} />} />
          <Route exact path="/admin/forums/create" element={<AdminForumCreate store={store} />} />
        </>
      } */}
      </Routes>
    </>
  )  
}

export default observer(App);
