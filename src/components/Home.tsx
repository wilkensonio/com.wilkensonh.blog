import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hook";
import { RootState } from "../redux/Store";
import { setAllArticles } from "../redux/slices/ArticleSlice";
import { Cpu } from "lucide-react";
import { Article } from "../types/interface";
import { FeaturedArticle } from "./FeaturedArticle";
import { LatestArticle } from "./LatestArticle";
import { SubscribeForm } from "./SubscribeForm";
import Footer from "./Footer";
import "../styles/home.css";

const LandingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const dispatch = useAppDispatch();

  const { featuredArticles, latestArticles } = useAppSelector(
    (state: RootState) => state.article
  );

  const featuredArticleData = [
    {
      id: 1,
      title: "The Future of Generative AI",
      excerpt:
        "Exploring the transformative potential of large language models and their impact on various industries.",
      author: "Dr. Elena Rodriguez",
      date: "November 15, 2024",
      category: "Machine Learning",
      imageUrl: "/assets/img.jpg",
      heroImage: "/assets/img.jpg",
      // imageUrl: '/api/placeholder/800/400'
      readTime: "8 min read",
      content: [
        {
          type: "paragraph",
          text: "Generative AI has emerged as one of the most transformative technologies of the 21st century...",
        },
        { type: "heading", text: "Understanding Generative AI" },
        {
          type: "paragraph",
          text: "At its core, generative AI refers to artificial intelligence systems capable of creating new content...",
        },
        {
          type: "quote",
          text: '"The potential of generative AI is not just in mimicking human creativity..." - Dr. Elena Rodriguez',
        },
      ],
      tags: ["Machine Learning", "AI Innovation", "Technology Trends"],
    },
    {
      id: 2,
      title: "Ethical AI: Navigating the Complex Landscape",
      excerpt:
        "A deep dive into the moral considerations and responsible development of artificial intelligence.",
      author: "Michael Chen",
      date: "November 10, 2024",
      category: "Deap Learning",
      imageUrl: "/assets/default-card-img.jpg",
      heroImage: "/assets/default-card-img.jpg",
      readTime: "5 min read",
      content: [
        {
          type: "paragraph",
          text: "JavaScript is one of the most popular programming languages in the world...",
        },
        { type: "heading", text: "Why JavaScript?" },
        {
          type: "paragraph",
          text: "It is widely used for web development and has a rich ecosystem of libraries and frameworks.",
        },
        {
          type: "quote",
          text: '"JavaScript allows you to build dynamic and interactive web applications..."',
        },
      ],
      tags: ["AI", "Machine Learning", "Inovation"],
      // imageUrl: '/api/placeholder/800/400'
    },
    {
      id: 3,
      title: "Ethical AI: Navigating the Complex Landscape",
      excerpt:
        "A deep dive into the moral considerations and responsible development of artificial intelligence.",
      author: "Michael Chen",
      date: "November 10, 2024",
      category: "Data Science",
      imageUrl: "/assets/default-card-img.jpg",
      heroImage: "/assets/default-card-img.jpg",
      readTime: "5 min read",
      content: [
        {
          type: "paragraph",
          text: "JavaScript is one of the most popular programming languages in the world...",
        },
        { type: "heading", text: "Why JavaScript?" },
        {
          type: "paragraph",
          text: "It is widely used for web development and has a rich ecosystem of libraries and frameworks.",
        },
        {
          type: "quote",
          text: '"JavaScript allows you to build dynamic and interactive web applications..."',
        },
      ],
      tags: ["AI", "Machine Learning", "Inovation"],
      // imageUrl: '/api/placeholder/800/400'
    },
    {
      id: 4,
      title: "Ethical AI: Navigating the Complex Landscape",
      excerpt:
        "A deep dive into the moral considerations and responsible development of artificial intelligence.",
      author: "Michael Chen",
      date: "November 10, 2024",
      category: "Algorithms",
      imageUrl: "/assets/default-card-img.jpg",
      heroImage: "/assets/default-card-img.jpg",
      readTime: "5 min read",
      content: [
        {
          type: "paragraph",
          text: "JavaScript is one of the most popular programming languages in the world...",
        },
        { type: "heading", text: "Why JavaScript?" },
        {
          type: "paragraph",
          text: "It is widely used for web development and has a rich ecosystem of libraries and frameworks.",
        },
        {
          type: "quote",
          text: '"JavaScript allows you to build dynamic and interactive web applications..."',
        },
      ],
      tags: ["AI", "Machine Learning", "Inovation"],
      // imageUrl: '/api/placeholder/800/400'
    },
  ];

  const latestArticleData = [
    {
      id: 5,
      title: "Neural Networks: Beyond the Basics",
      excerpt:
        "Advanced techniques in deep learning and neural network architectures.",
      author: "Sarah Kim",
      date: "November 5, 2024",
      category: "Machine Learning",
      heroImage: "/assets/default-card-img.jpg",
      readTime: "5 min read",
      content: [
        {
          type: "paragraph",
          text: "JavaScript is one of the most popular programming languages in the world...",
        },
        { type: "heading", text: "Why JavaScript?" },
        {
          type: "paragraph",
          text: "It is widely used for web development and has a rich ecosystem of libraries and frameworks.",
        },
        {
          type: "quote",
          text: '"JavaScript allows you to build dynamic and interactive web applications..."',
        },
      ],
      tags: ["Machine Learning", "AI Innovation", "Technology Trends"],
    },
    {
      id: 6,
      title: "AI in Healthcare: Revolutionizing Diagnosis",
      excerpt:
        "How artificial intelligence is transforming medical diagnostics and patient care.",
      author: "Dr. James Watson",
      date: "October 28, 2024",
      category: "Algorithms",
      heroImage: "/assets/img.jpg",
      readTime: "8 min read",
      content: [
        {
          type: "paragraph",
          text: "Generative AI has emerged as one of the most transformative technologies of the 21st century...",
        },
        { type: "heading", text: "Understanding Generative AI" },
        {
          type: "paragraph",
          text: "At its core, generative AI refers to artificial intelligence systems capable of creating new content...",
        },
        {
          type: "quote",
          text: '"The potential of generative AI is not just in mimicking human creativity..." - Dr. Elena Rodriguez',
        },
      ],
      tags: ["AI", "Machine Learning", "Inovation"],
      // imageUrl: '/api/placeholder/800/400',
    },
  ];

  useEffect(() => {
    dispatch(
      setAllArticles({
        featured: featuredArticleData as Article[],
        latest: latestArticleData as Article[],
      })
    );
  }, [dispatch]);

  return (
    <div className="home__container">
      <header className="home__header">
        <div className="home__purple-gradient"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="home__title">Kadeeno Pulse</h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200">
            Capturing the heartbeat of Artificial Intelligence (AI).
          </p>
          <SubscribeForm />
          <p className="text-gray-400 text-sm mt-12">
            Subscribe to our newsletter for the latest updates and insights on
            AI and technology. By subscribing, you agree to our{" "}
            <Link
              to="/privacy-policy"
              className="text-blue-400 hover:text-blue-300 pr-2"
            >
              Privacy Policy
            </Link>
            and{" "}
            <Link
              to="/term-of-use"
              className="text-blue-400 hover:text-blue-300"
            >
              Term of use
            </Link>
            .
          </p>
        </div>
      </header>

      {/* Category Navigation */}
      <div className="container mx-auto py-8">
        <div className="flex justify-center">
          <div className="w-11/12 sm:w-80">
            <div className="home__category-nav">
              <Link to="/articles">
                <div className="flex justify-center space-x-4 rounded-full px-8 py-3 text-sm font-medium group-hover:bg-transparent">
                  <Cpu className="w-6 h-6" />
                  <p>All Articles</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <FeaturedArticle featuredArticles={featuredArticles} />

      {/* Latest Articles */}
      <LatestArticle latestArticles={latestArticles} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
