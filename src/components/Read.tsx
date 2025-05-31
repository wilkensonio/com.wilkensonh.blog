import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/Hook";
import { Article } from "../types/interface";
import { Clock, User, Share2, ArrowLeft } from "lucide-react";
import Footer from "./Footer";
import { useEffect } from "react";

const ArticlePage: React.FC = () => {
  const currentPageUrl = window.location.href;
  const navigator = window.navigator;

  const { id } = useParams<{ id: string }>();
  const { featuredArticles, latestArticles } = useAppSelector(
    (state) => state.article
  );
  const allArticles = [...featuredArticles, ...latestArticles];
  const article: Article | undefined = allArticles.find(
    (a) => a.id.toString() === id
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-800">
        <div className="text-3xl font-bold text-purple-700">
          Article not found
        </div>
      </div>
    );
  }

  const shareArticle = async () => {
    console.log(navigator.platform);

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: currentPageUrl,
        });
      } catch (error) {
        console.error("Error sharing article:", error);
      }
    } else {
      navigator.clipboard
        .writeText(currentPageUrl)
        .then(() => {
          alert("Article link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying article link:", error);
          alert("Failed to copy article link.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Article Header */}
      <header className="relative">
        <div
          className="h-[50vh] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${article.heroImage})`,
          }}
        >
          <div className="container mx-auto h-full flex flex-col justify-end pb-12 px-4">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                {article.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="container mx-auto max-w-4xl py-16 px-4 min-h-80">
        {article.content &&
          article.content.map((block, index) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-lg text-gray-300 mb-6 leading-relaxed"
                  >
                    {block.text}
                  </p>
                );
              case "heading":
                return (
                  <h2
                    key={index}
                    className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                  >
                    {block.text}
                  </h2>
                );
              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-blue-500 pl-6 py-4 my-8 italic text-xl text-gray-300"
                  >
                    {block.text}
                  </blockquote>
                );
              default:
                return null;
            }
          })}

        {/* Share or Navigation */}
        <div className="mt-12 flex justify-between items-center mb-10">
          <Link to="/articles">
            <button className="flex items-center z-20  text-blue-400 hover:text-blue-300  bg-gray-900 p-2 rounded-full justify-center">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="bg-clip-text text-transparent text-white"></span>
            <button
              className="text-blue-400 hover:text-blue-300 bg-gray-800 p-2 rounded-full flex items-center justify-center "
              onClick={shareArticle}
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </article>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ArticlePage;
