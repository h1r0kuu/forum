async function App() {
  let forums = []


  const response = await fetch('/api/v1/forums/all')
  const body = await response.json()
  forums=body
  return (
    <div className="App">
      {forums.map(forum => {
        <div>
          {forum.title}
        </div>
      })}
    </div>
  );
}

export default App;
