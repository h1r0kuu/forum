import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import PostCreate from "./layouts/PostCreate";
import Index from "./pages/Index";
import SinglePost from "./pages/SinglePost";
import Login from "./layouts/Login"
import Registration from "./layouts/Registration"
import "./styles/app.css"
import { useContext, useEffect } from "react";
import { Context } from "./index";
import {observer} from 'mobx-react-lite'

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

      </Routes>
    </>
  )  
}

export default observer(App);
