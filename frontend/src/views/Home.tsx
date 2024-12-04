import {Link} from 'react-router-dom';
import{ useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/Hook';
import {RootState} from '../redux/Store';
import {setAllArticles}  from '../redux/slices/ArticleSlice';
import { ChevronRight, Cpu, Code, Zap, Braces } from 'lucide-react';
import Footer from './Footer';



const  LandingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const dispatch = useAppDispatch();
  const {featuredArticles, latestArticles} = useAppSelector((state: RootState) => state.article);

  const categories = [
    { name: 'All', icon: <Cpu className="w-6 h-6" /> },
    { name: 'Machine Learning', icon: <Zap className="w-6 h-6" /> },
    { name: 'Data Science', icon: <Code className="w-6 h-6" /> },
    { name: 'Deep Learning', icon: <Zap className="w-6 h-6" /> },
    { name: 'Algorithms', icon: <Braces className="w-6 h-6" /> }
  ];

  const featuredArticleData = [
    {
      id: 1,
      title: 'The Future of Generative AI',
      excerpt: 'Exploring the transformative potential of large language models and their impact on various industries.',
      author: 'Dr. Elena Rodriguez',
      date: 'November 15, 2024',
      category: 'Machine Learning',
      imageUrl:'/assets/img.jpg',
      heroImage: '/assets/img.jpg',
      // imageUrl: '/api/placeholder/800/400'
      readTime: '8 min read',
      content: [
        { type: 'paragraph', text: 'Generative AI has emerged as one of the most transformative technologies of the 21st century...' },
        { type: 'heading', text: 'Understanding Generative AI' },
        { type: 'paragraph', text: 'At its core, generative AI refers to artificial intelligence systems capable of creating new content...' },
        { type: 'quote', text: '"The potential of generative AI is not just in mimicking human creativity..." - Dr. Elena Rodriguez' }
      ],
      tags: ['Machine Learning', 'AI Innovation', 'Technology Trends']
    },
    {
      id: 2,
      title: 'Ethical AI: Navigating the Complex Landscape',
      excerpt: 'A deep dive into the moral considerations and responsible development of artificial intelligence.',
      author: 'Michael Chen',
      date: 'November 10, 2024',
      category: 'Deap Learning',
      imageUrl:'/assets/default-card-img.jpg',
      heroImage:'/assets/default-card-img.jpg',
      readTime: '5 min read',
      content: [
        { type: 'paragraph', text: 'JavaScript is one of the most popular programming languages in the world...' },
        { type: 'heading', text: 'Why JavaScript?' },
        { type: 'paragraph', text: 'It is widely used for web development and has a rich ecosystem of libraries and frameworks.' },
        { type: 'quote', text: '"JavaScript allows you to build dynamic and interactive web applications..."' }     
      ],
      tags: ['AI', 'Machine Learning', 'Inovation']
      // imageUrl: '/api/placeholder/800/400'
    },
    {
      id: 2,
      title: 'Ethical AI: Navigating the Complex Landscape',
      excerpt: 'A deep dive into the moral considerations and responsible development of artificial intelligence.',
      author: 'Michael Chen',
      date: 'November 10, 2024',
      category: 'Data Science',
      imageUrl:'/assets/default-card-img.jpg',
      heroImage:'/assets/default-card-img.jpg',
      readTime: '5 min read',
      content: [
        { type: 'paragraph', text: 'JavaScript is one of the most popular programming languages in the world...' },
        { type: 'heading', text: 'Why JavaScript?' },
        { type: 'paragraph', text: 'It is widely used for web development and has a rich ecosystem of libraries and frameworks.' },
        { type: 'quote', text: '"JavaScript allows you to build dynamic and interactive web applications..."' }     
      ],
      tags: ['AI', 'Machine Learning', 'Inovation']
      // imageUrl: '/api/placeholder/800/400'
    },
    {
      id: 2,
      title: 'Ethical AI: Navigating the Complex Landscape',
      excerpt: 'A deep dive into the moral considerations and responsible development of artificial intelligence.',
      author: 'Michael Chen',
      date: 'November 10, 2024',
      category: 'Algorithms',
      imageUrl:'/assets/default-card-img.jpg',
      heroImage:'/assets/default-card-img.jpg',
      readTime: '5 min read',
      content: [
        { type: 'paragraph', text: 'JavaScript is one of the most popular programming languages in the world...' },
        { type: 'heading', text: 'Why JavaScript?' },
        { type: 'paragraph', text: 'It is widely used for web development and has a rich ecosystem of libraries and frameworks.' },
        { type: 'quote', text: '"JavaScript allows you to build dynamic and interactive web applications..."' }     
      ],
      tags: ['AI', 'Machine Learning', 'Inovation']
      // imageUrl: '/api/placeholder/800/400'
    }
  ];
  
  const latestArticleData = [
    {
      id: 3,
      title: 'Neural Networks: Beyond the Basics',
      excerpt: 'Advanced techniques in deep learning and neural network architectures.',
      author: 'Sarah Kim',
      date: 'November 5, 2024',
      category: 'Machine Learning',
      heroImage:'/assets/default-card-img.jpg',
      readTime: '5 min read',
      content: [
        { type: 'paragraph', text: 'JavaScript is one of the most popular programming languages in the world...' },
        { type: 'heading', text: 'Why JavaScript?' },
        { type: 'paragraph', text: 'It is widely used for web development and has a rich ecosystem of libraries and frameworks.' },
        { type: 'quote', text: '"JavaScript allows you to build dynamic and interactive web applications..."' }     
      ],
      tags: ['Machine Learning', 'AI Innovation', 'Technology Trends']
    },
    {
      id: 4,
      title: 'AI in Healthcare: Revolutionizing Diagnosis',
      excerpt: 'How artificial intelligence is transforming medical diagnostics and patient care.',
      author: 'Dr. James Watson',
      date: 'October 28, 2024',
      category: 'Algorithms',
      heroImage: '/assets/img.jpg',
      readTime: '8 min read',
      content: [
        { type: 'paragraph', text: 'Generative AI has emerged as one of the most transformative technologies of the 21st century...' },
        { type: 'heading', text: 'Understanding Generative AI' },
        { type: 'paragraph', text: 'At its core, generative AI refers to artificial intelligence systems capable of creating new content...' },
        { type: 'quote', text: '"The potential of generative AI is not just in mimicking human creativity..." - Dr. Elena Rodriguez' }
      ],
      tags: ['AI', 'Machine Learning', 'Inovation']
      // imageUrl: '/api/placeholder/800/400',
    }
  ];

  useEffect(() => {
    dispatch(setAllArticles({ 
      featured: featuredArticleData, 
      latest: latestArticleData 
    }));
  }, [dispatch]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <header className="relative h-[70vh] flex flex-col justify-center items-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-500/30 opacity-75 blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Kadeeno Blog
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200">
            Exploring the Frontiers of Artificial Intelligence, One Breakthrough at a Time
          </p>
          <div className="flex justify-center space-x-4">
            <input 
              type="email" 
              placeholder="Subscribe for the latest updates" 
              className="px-4 py-3 rounded-l-lg w-full max-w-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300"
            />
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="container mx-auto py-8 overflow-x-auto">
        <div className="flex justify-center space-x-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center space-x-2 px-4 py-1 rounded-full transition-all ${
                activeCategory === category.name 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Featured Articles */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredArticles.map((article) => (
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
                <div className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <span><Link to={`/article/${article.id}`}>Read More</Link></span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
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
                <span className="mr-2"><Link to={`/article/${article.id}`}>Read More</Link></span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;