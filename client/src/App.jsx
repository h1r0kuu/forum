import Index from "./pages/Index"
import SinglePost from "./pages/SinglePost"
import PostCreate from "./pages/PostCreate"

import Login from "./components/Auth/Login"
import Registration from "./components/Auth/Registration"

import { Route, Routes } from "react-router-dom"
import { useContext, useEffect } from "react";
import { Context } from "./index";
import { observer } from 'mobx-react-lite'
import "./styles/app.css"
import Profile from "./components/User/Profile"

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
        <Route exact path="/forums/:forumId" element={<Index store={store}/>} />
        <Route exact path="/forums/:forumId/posts/create" element={<PostCreate store={store} />} />
        <Route exact path="/posts/:postId" element={<SinglePost store={store}/>} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registration" element={<Registration />} />

        <Route exact path="/user/:username" element={<Profile store={store} />} />

      </Routes>
    </>
  )  
}

export default observer(App);
