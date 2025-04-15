import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';


const Editor = lazy(() => import('./admin/Editor.tsx'));
const Login = lazy(() => import('./admin/Login.tsx'));
const Signup = lazy(() =>  import('./admin/Signup.tsx'));
const Article = lazy(() => import('./admin/Articles.tsx'));

const Home = lazy(() => import('./views/Home'));
const ArticleRead = lazy(() => import('./views/Read'));
const Articles = lazy(() =>  import('./views/Articles'));


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
        {/*  non-admin */}
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleRead />} />
        {/*  admin*/}
        <Route path="/edit" element={<Editor onSubmit={handleEditorSubmit} />} />
        <Route path="/articles" element={<Article/>}  />
        <Route path="/article-editor" element={<Editor onSubmit={handleEditorSubmit} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;



