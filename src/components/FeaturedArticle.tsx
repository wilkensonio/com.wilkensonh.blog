import type { FeaturedArticle as FeaturedArticleProps } from "../types/interface";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  featuredArticles,
}) => {
  return (
    <section className="container mx-auto ">
      <h2 className="text-3xl font-bold mb-10 text-center">Featured</h2>
      <div className="overflow-x-auto no-scrollbar">
        <div className="inline-flex space-x-8 pb-4">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              className="max-w-72 flex-shrink-0 bg-white/10 rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                    {article.category}
                  </span>
                  <span className="text-gray-400 text-sm">{article.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{article.title}</h3>
                <p className="text-gray-300 mb-6">{article.excerpt}</p>
                <div className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <span>
                    <Link to={`/article/${article.id}`}>Read More</Link>
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
