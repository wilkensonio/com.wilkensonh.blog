
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/Hook';
import { Clock, User, Share2, ArrowLeft } from 'lucide-react'; 
import Footer from './Footer';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();  
  const { featuredArticles, latestArticles } = useAppSelector((state) => state.article);
  const allArticles = [...featuredArticles, ...latestArticles];
  const article = allArticles.find((a) => a.id.toString() === id);

  if (!article) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-800">
        <div className="text-3xl font-bold text-purple-700">Article not found</div>
      </div>
    );
  } 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Article Header */}
      <header className="relative">
        <div 
          className="h-[50vh] bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${article.heroImage})` 
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
        {article.content && article.content.map((block, index) => {
          switch(block.type) {
            case 'paragraph':
              return (
                <p 
                  key={index} 
                  className="text-lg text-gray-300 mb-6 leading-relaxed"
                >
                  {block.text}
                </p>
              );
            case 'heading':
              return (
                <h2 
                  key={index} 
                  className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                >
                  {block.text}
                </h2>
              );
            case 'quote':
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

        {/* Share and Navigation */}
        <div className="mt-12 flex justify-between items-center mb-10">
          <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className='bg-clip-text text-transparent text-white'> <Link to='/'> Go Back </Link></span>
          </button>
          <div className="flex items-center space-x-4">
            <span className="bg-clip-text text-transparent text-white">Share:</span>
            <button className="text-blue-400 hover:text-blue-300">
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





// const Articles = [
//   {
//     id: '1',
//     title: 'The Future of Generative AI: Transforming Industries',
//     author: 'Dr. Elena Rodriguez',
//     date: 'November 15, 2024',
//     readTime: '8 min read',
//     heroImage: '/img.jpg',
//     content: [
//       { type: 'paragraph', text: 'Generative AI has emerged as one of the most transformative technologies of the 21st century...' },
//       { type: 'heading', text: 'Understanding Generative AI' },
//       { type: 'paragraph', text: 'At its core, generative AI refers to artificial intelligence systems capable of creating new content...' },
//       { type: 'quote', text: '"The potential of generative AI is not just in mimicking human creativity..." - Dr. Elena Rodriguez' }
//     ],
//     tags: ['Machine Learning', 'AI Innovation', 'Technology Trends']
//   },
//   { 
//     id: '2',
//     title: 'Ethical AI: Navigating the Complex Landscape',
//     readTime: '8 min read',
//     author: 'Michael Chen',
//     date: 'November 10, 2024',
//     category: 'Innovations',
//     heroImage:'/default-card-img.jpg',
//     content: [
//       { type: 'paragraph', text: 'JavaScript is one of the most popular programming languages in the world...' },
//       { type: 'heading', text: 'Why JavaScript?' },
//       { type: 'paragraph', text: 'It is widely used for web development and has a rich ecosystem of libraries and frameworks.' },
//       { type: 'quote', text: '"JavaScript allows you to build dynamic and interactive web applications..."' }
       
//     ],
//     tags: ['AI', 'Machine Learning', 'Inovation']
//   }
// ];