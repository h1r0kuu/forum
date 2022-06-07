import {useState, useEffect, useRef} from 'react'
import ForumService from './services/ForumService'

function App() {
  const [forums, setForums] = useState([])

  useEffect(()=>{
    ForumService.getAllForums().then( res => {
      setForums(res.data)
      console.log(res.data)
    })
  }, [])

  return (
    <div className="App">
      {forums.map(forum=> (
        <p>{forum.id}</p>
      ))}
    </div>
  );
}

export default App;
