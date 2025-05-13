import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const ArticleRead = lazy(() => import('./components/Read'));
const Articles = lazy(() =>  import('./components/Articles'));

const RoutesConfig: React.FC = () => {
  return (
    <Suspense fallback={<div>
      <div className="flex justify-center items-center h-screen bg-purple-700"> 
        <div className="text-3xl font-bold text-white">Loading...</div>
      </div>
    </div>}> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleRead />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;
