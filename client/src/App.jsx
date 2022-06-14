import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import PostCreate from "./layouts/PostCreate";
import Index from "./pages/Index";
import SinglePost from "./pages/SinglePost";
import "./styles/app.css"

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Index />} />
        <Route exact path="/forums/:forumId" element={<Index />} />
        <Route exact path="/forums/:forumId/posts/create" element={<PostCreate />} />
        <Route exact path="/posts/:postId" element={<SinglePost />} />
      </Routes>
    </>
  )  
}

export default App;
