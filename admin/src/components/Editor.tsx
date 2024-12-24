import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { 
  PlusCircle, 
  Heading, 
  Quote, 
  Type, 
  Image, 
  Trash2,
  Save,
  User,
  Calendar,
  Clock,
  MessageCircle
} from 'lucide-react';

// Types for content blocks and post
type ContentBlockType = 'paragraph' | 'heading' | 'quote' | 'image';

interface ContentBlock {
  type: ContentBlockType;
  text?: string;
  imageUrl?: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  content: ContentBlock[];
  tags: string[];
}

interface BlogPostEditorProps {
  initialPost?: Partial<BlogPost>;
  onSubmit: (post: BlogPost) => void;
}

const Editor: React.FC<BlogPostEditorProps> = ({ 
  initialPost = {}, 
  onSubmit 
}) => {
  // State for all fields
  const [title, setTitle] = useState(initialPost.title || '');
  const [excerpt, setExcerpt] = useState(initialPost.excerpt || '');
  const [author, setAuthor] = useState(initialPost.author || '');
  const [date, setDate] = useState(initialPost.date || new Date().toLocaleDateString());
  const [content, setContent] = useState<ContentBlock[]>(
    initialPost.content || []
  );
  const [tags, setTags] = useState(initialPost.tags || []);
  const [newTag, setNewTag] = useState('');
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: 50, y: 50 }); 
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);

  const chatIconRef = useRef(null); // Ref for dragging chat icon

  const startDrag = (event: React.MouseEvent, target: 'icon' | 'popup') => {
    const isIcon = target === 'icon';
    const element = isIcon ? chatPosition : popupPosition ?? chatPosition;
    const offsetX = event.clientX - element.x;
    const offsetY = event.clientY - element.y;

    const onDrag = (moveEvent: MouseEvent) => {
      const newPosition = {
        x: moveEvent.clientX - offsetX,
        y: moveEvent.clientY - offsetY,
      };
      if (isIcon) setChatPosition(newPosition);
      else setPopupPosition(newPosition);
    };

    const stopDrag = () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
    };

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
  };


  
  // Refs for file inputs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Content block management methods
  const addContentBlock = (type: ContentBlockType) => {
    setContent([...content, { type, text: '' }]);
  };

  const updateContentBlock = (index: number, updates: Partial<ContentBlock>) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], ...updates };
    setContent(newContent);
  };

  const removeContentBlock = (index: number) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  // Image upload handler
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:8000/upload-image/', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        
        // Add image block to content
        setContent([
          ...content, 
          { type: 'image', imageUrl: data.imageUrl }
        ]);
      } catch (error) {
        console.error('Image upload failed', error);
      }
    }
  };

  // Submit handler
  const handleSubmit = () => {
    // Calculate read time
    const wordCount = content.reduce((acc, block) => 
      acc + (block.text?.split(' ').length || 0), 0);
    const readTime = `${Math.ceil(wordCount / 200)} min read`;

    const post: BlogPost = {
      title,
      excerpt,
      author,
      date,
      readTime,
      content,
      tags,
    };

    onSubmit(post);
  };


  return (
    <>  
      <div className="max-w-4xl mx-auto p-6 bg-slate-50 shadow-md rounded-lg pt-4 mt-4 mb-11">
        <div className='flex justify-end mb-4 gap-3'>
          <Link to='/signout' className='bg-purple-300 px-1 hover:bg-purple-600'> Signout </Link>
          <Link to='/articles' className='bg-purple-300 px-1 hover:bg-purple-600'> Articles </Link>
        </div>
        {/* Title Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 p-2"
          />
        </div>

        {/* Metadata Inputs */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Author Input */}
          <div className="flex items-center border-2 border-gray-300 rounded">
            <div className="pl-2 text-gray-500"><User size={20} /></div>
            <input
              type="text"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 focus:outline-none"
            />
          </div>

          {/* Date Input */}
          <div className="flex items-center border-2 border-gray-300 rounded">
            <div className="pl-2 text-gray-500"><Calendar size={20} /></div>
            <input
              type="date"
              placeholder="Publication Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 focus:outline-none"
            />
          </div>

          {/* Read Time (calculated automatically) */}
          <div className="flex items-center border-2 border-gray-300 rounded cursor-not-allowed">
            <div className="pl-2 text-gray-500"><Clock size={20} /></div>
            <input
              type="text"
              placeholder="Read Time"
              value={`${Math.ceil(content.reduce((acc, block) => 
                acc + (block.text?.split(' ').length || 0), 0) / 200)} min read`}
              readOnly
              className="w-full p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Excerpt Input */}
        <div className="mb-4">
          <textarea
            placeholder="Write a brief excerpt..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full border-2 border-gray-300 rounded p-2 h-24 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Tags Section */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Add Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-grow border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={() => {
              if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setNewTag('');
              }
            }}
            className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-2 rounded
            hover:from-blue-500 hover:to-purple-600"
          >
            <PlusCircle size={20} />
          </button>
        </div>

        {/* Tags Display */}
        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button 
                  onClick={() => setTags(tags.filter(t => t !== tag))}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        
        {/* Content Block Buttons */}
        <div className="flex space-x-2 mb-4">
          <button 
            onClick={() => addContentBlock('paragraph')}
            className="flex items-center space-x-2 bg-gray-200 p-2 rounded"
          >
            <Type size={16} /> Paragraph
          </button>
          <button 
            onClick={() => addContentBlock('heading')}
            className="flex items-center space-x-2 bg-gray-200 p-2 rounded"
          >
            <Heading size={16} /> Heading
          </button>
          <button 
            onClick={() => addContentBlock('quote')}
            className="flex items-center space-x-2 bg-gray-200 p-2 rounded"
          >
            <Quote size={16} /> Quote
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 bg-gray-200 p-2 rounded"
          >
            <Image size={16} /> Upload Image
          </button>
        </div>

        {/* Content Blocks */}
        {content.map((block, index) => (
          <div key={index} className="mb-4 flex items-center space-x-2">
            {block.type === 'paragraph' && (
              <textarea
                placeholder="Paragraph text"
                value={block.text}
                onChange={(e) => updateContentBlock(index, { text: e.target.value })}
                className="flex-1 border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
              />
            )}
            {block.type === 'heading' && (
              <input
                type="text"
                placeholder="Heading text"
                value={block.text}
                onChange={(e) => updateContentBlock(index, { text: e.target.value })}
                className="flex-1 border-2 border-gray-300 rounded p-2 text-xl font-bold focus:outline-none focus:border-blue-500"
              />
            )}
            {block.type === 'quote' && (
              <textarea
                placeholder="Quote text"
                value={block.text}
                onChange={(e) => updateContentBlock(index, { text: e.target.value })}
                className="flex-1 border-2 border-gray-300 rounded p-2 italic focus:outline-none focus:border-blue-500"
              />
            )}
            {block.type === 'image' && block.imageUrl && (
              <div className="flex items-center space-x-2">
                <img 
                  src={block.imageUrl} 
                  alt="Uploaded" 
                  className="max-w-xs max-h-48 object-cover rounded" 
                />
              </div>
            )}
            <button 
              onClick={() => removeContentBlock(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {/* Submit Button */}
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 
            bg-gradient-to-r from-blue-400 to-purple-500
            text-white px-4 py-2 rounded hover:from-blue-500 hover:to-purple-600"
          >
            <Save size={16} /> &nbsp; &nbsp; Save
          </button>
        </div> 
      </div> 
        
        {/* Chat Icon */}
        <div
        ref={chatIconRef}
        onMouseDown={(event) => startDrag(event, 'icon')}
        style={{
          position: 'fixed',
          top: `${chatPosition.y}px`,
          left: `${chatPosition.x}px`,
          cursor: 'move',
          zIndex: 1000, 
        }}
        className="chat-icon p-3 bg-gradient-to-r from-blue-700 via-gray-300 to-purple-900 rounded-full shadow-lg"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <MessageCircle color="white" size={24} />
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div
          onMouseDown={(event) => startDrag(event, 'popup')}
          style={{
            position: 'fixed',
            top: `${(popupPosition ?? chatPosition).y + 60}px`,
            left: `${(popupPosition ?? chatPosition).x}px`,
            cursor: 'move',
            zIndex: 1100,
            width: '300px',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
          }}
          className="chat-box"
        >
          <div className="chat-header flex justify-between p-3 border-b">
            <h3 className="text-lg font-bold">Your writing assistant.</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </div>
          <div className="chat-body p-3 h-48 overflow-auto text-wrap">
            <p className="text-gray-600 pb-2 google-gemini-text">Hello! How can I assist you?</p>
            <p className=''>adfadfdfad fadsfadsfadsfadsfadsf adsfdasfadsfadfdasfdsfasd 
              adfadfdfadfadsfadsfadsfadsfadsf adfadfdfadfadsfadsfadsfadsfadsf
              adfadfdfadfadsfadsfadsfadsfadsf adfadfdfadfadsfadsfadsfadsfadsf
              adfadfdfadfadsfadsfadsfadsfadsf adfadfdfadfadsfadsfadsfadsfadsf
              adfadfdfadfadsfadsfadsfadsfadsf adfadfdfadfadsfadsfadsfadsfadsf</p>
            
          </div>
          <div className="chat-footer flex items-center p-3 border-t">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l-md"
              placeholder="Type your message..."
            />
            <button className="bg-gradient-to-b from-blue-300 via-slate-500 to-purple-500 text-white px-4 py-2 rounded-r-md">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;