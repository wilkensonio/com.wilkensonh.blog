import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Editor = lazy(() => import('./components/Editor'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() =>  import('./components/Signup'));
const Article = lazy(() => import('./components/Articles'));

const handleEditorSubmit = (post: any) => {
  console.log('Post submitted:', post);
  // Add logic to save the post, e.g., send it to your backend API
};

const RoutesConfig: React.FC = () => {
  return (
    <Suspense fallback={<div>
      <div className="flex justify-center items-center h-screen bg-purple-700"> 
        <div className="text-3xl font-bold text-white">Loading...</div>
      </div>
    </div>}> 
      <Routes>
        <Route path="/" element={<Editor onSubmit={handleEditorSubmit} />} />
        <Route path="/articles" element={<Article/>}  />
        <Route path="/article-editor" element={<Editor onSubmit={handleEditorSubmit} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;
