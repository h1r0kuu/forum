import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Index from "./pages/Index";
import PostList from "./components/Post/PostList";
import "./styles/app.css"

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/forums/:forumId" element={<PostList />} />
          </Routes>
      </Router>
    </>
  )  
}

export default App;
