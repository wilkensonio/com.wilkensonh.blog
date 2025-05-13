import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const Policy = lazy(() => import("./components/Policy"));
const Term = lazy(() => import("./components/Term"));
const ArticleRead = lazy(() => import("./components/Read"));
const Articles = lazy(() => import("./components/Articles"));
const Editor = lazy(() => import("./admin/Editor.tsx"));

const RoutesConfig: React.FC = (): JSX.Element => {
  const post = {
    title: "Sample Blog Post",
    excerpt: "This is a sample blog post excerpt.",
    image: "https://via.placeholder.com/150",
    author: "John Doe",
    date: "2023-10-01",
    readTime: "5 min read",
    content:
      "This is the content of the sample blog post. It can be a long text with multiple paragraphs.",
    tags: ["sample", "blog", "post"],
    id: "1",
  };
  return (
    <Suspense
      fallback={
        <div>
          <div className="flex justify-center items-center h-screen bg-purple-700">
            <div className="text-3xl font-bold text-white">Loading...</div>
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/term-of-use" element={<Term />} />
        <Route path="/terms" element={<div>Terms</div>} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleRead />} />
        <Route
          path="/editor"
          element={<Editor onSubmit={() => console.log(post)} />}
        />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;
