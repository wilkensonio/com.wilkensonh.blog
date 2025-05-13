import { Article } from "../types/interface";

import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface LatestArticlesProps {
  latestArticles: Article[];
}

export const LatestArticle: React.FC<LatestArticlesProps> = ({
  latestArticles,
}) => {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">Latest Articles</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {latestArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-colors"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                {article.category}
              </span>
              <span className="text-gray-400 text-sm">{article.date}</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{article.title}</h3>
            <p className="text-gray-300 mb-6">{article.excerpt}</p>
            <div className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
              <span className="mr-2">
                <Link to={`/article/${article.id}`}>Read More</Link>
              </span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
