import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Index from "./pages/Index";
import "./styles/app.css"
import ForumPosts from "./pages/ForumPosts";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/forums/:forumId" element={<ForumPosts />} />
          </Routes>
      </Router>
    </>
  )  
}

export default App;
