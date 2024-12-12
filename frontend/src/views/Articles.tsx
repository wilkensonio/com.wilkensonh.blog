import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ArrowLeft, Cpu, ChartNoAxesCombined, BrainCircuit, Binary, Braces } from 'lucide-react';

// Article interface
interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
  tags: string[];
}

// Sample articles data
const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Large Language Models',
    excerpt: 'Exploring the transformative potential of advanced AI language technologies and their impact on global communication.',
    author: 'Dr. Emily Chen',
    date: 'May 15, 2024',
    category: 'Machine Learning',
    imageUrl: '/assets/img.jpg',
    readTime: '5 min read',
    tags: ['AI', 'Machine Learning', 'NLP']
  },
  {
    id: '2',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Deep Learning', 'AI', 'Technology']
  },
  {
    id: '3',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Deep Learning', 'AI', 'Technology']
  },
  {
    id: '4',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Deep Learning', 'AI', 'Technology']
  },
  {
    id: '5',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Ethics', 'AI', 'Technology']
  },
  {
    id: '6',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Ethics', 'AI', 'Technology']
  },
  {
    id: '7',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Ethics', 'AI', 'Technology']
  },
  {
    id: '8',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Ethics', 'AI', 'Technology']
  },
  {
    id: '9',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Ethics', 'AI', 'Technology']
  },
  {
    id: '10',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Ethics', 'AI', 'Technology']
  },
  {
    id: '11',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Ethics', 'AI', 'Technology']
  },
  {
    id: '12',
    title: 'Ethical AI: Navigating the Complex Landscape',
    excerpt: 'A comprehensive analysis of the moral and philosophical challenges in developing responsible artificial intelligence.',
    author: 'Michael Rodriguez',
    date: 'April 22, 2024',
    category: 'Deep Learning',
    imageUrl: '/assets/default-card-img.jpg',
    readTime: '7 min read',
    tags: ['Ethics', 'AI', 'Technology']
  },
  
];

const Articles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 6;

  // Categories<ChartNoAxesCombined />
  const categories = [
    { name: 'All', icon: <Cpu className="w-6 h-6" /> },
    { name: 'Machine Learning', icon: <Binary className="w-6 h-6" /> }, 
    { name: 'Data Science', icon: <ChartNoAxesCombined className="w-6 h-6"/> },
    { name: 'Deep Learning', icon: <BrainCircuit className="w-6 h-6" /> },
    { name: 'Algorithms', icon: <Braces className="w-6 h-6" /> }
  ];

  // Filtering and searching logic
  const filteredArticles = useMemo(() => {
    return sampleArticles.filter(article => 
      (activeCategory === 'All' || article.category === activeCategory) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, activeCategory]);

  // Pagination logic
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    return filteredArticles.slice(startIndex, startIndex + articlesPerPage);
  }, [filteredArticles, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-12 bg-fixed">
        {/* Header */} 
        <header className="text-center mb-12"> 
          <Link to='/'>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 underline
                bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 whitespace-nowrap"> 
                <span className='underline'>Kadeeno Pulse</span>
            </h1>
          </Link>

          <div className='flex jusitfy-center items-center'>
            {/* <ArrowLeft 
              size={48}   
              color='#6366f1'
            />  */}
            
          {/* Go Back */}
        </div>
        
          <p className="text-xl md:text-2xl mb-10 text-gray-200">
            Explore in-depth insights, cutting-edge research, and thought-provoking perspectives in artificial intelligence.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by title, tags, or keywords" 
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-3 rounded-lg w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-nowrap overflow-x-auto md:flex-wrap md:justify-center space-x-4 mb-12 scrollbar-hide">
            
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setActiveCategory(category.name);
                  setCurrentPage(1);
                }}
                className={`
                  flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeCategory === category.name 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                    : 'bg-white/10 hover:bg-white/20'}
                `}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.map((article) => (
            <div 
              key={article.id} 
              className="bg-white/10 rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform"
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
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{article.readTime}</span>
                  <div className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    <Link to={`/article/${article.id}`} className="mr-2">Read More</Link>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredArticles.length > articlesPerPage && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ 
              length: Math.ceil(filteredArticles.length / articlesPerPage) 
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`
                  px-4 py-2 rounded-full transition-all
                  ${currentPage === index + 1 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'}
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* No Results State */}
        {paginatedArticles.length === 0 && (
          <div className="text-center py-16">
            <h4 className="text-3xl font-bold text-gray-300 mb-4">No Articles Found</h4>
            <p className="text-lg text-gray-500">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;