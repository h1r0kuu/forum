import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Index from "./pages/Index";
import PostList from "./pages/PostList";

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
