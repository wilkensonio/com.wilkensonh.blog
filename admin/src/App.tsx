import Editor from './components/Editor';

function App() { 
  const handleEditorSubmit = (post: any) => {
    console.log('Post submitted:', post);
    // Add logic to save the post, e.g., send it to your backend API
  };

  return (
    <>
      <Editor onSubmit={handleEditorSubmit} />
    </>
  )
}

export default App
