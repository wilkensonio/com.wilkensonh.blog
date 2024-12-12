import React, { useState, useRef } from 'react';
import { 
  PlusCircle, 
  Heading, 
  Quote, 
  Type, 
  Image, 
  Trash2 
} from 'lucide-react';

// Types matching backend models
type ContentBlockType = 'paragraph' | 'heading' | 'quote' | 'image';

interface ContentBlock {
  type: ContentBlockType;
  text?: string;
  imageUrl?: string;
}

interface BlogPostEditorProps {
  initialPost?: {
    title?: string;
    excerpt?: string;
    category?: string;
    tags?: string[];
    content?: ContentBlock[];
  };
  onSubmit: (post: any) => void;
}

const Editor: React.FC<BlogPostEditorProps> = ({ 
  initialPost = {}, 
  onSubmit 
}) => {
  const [title, setTitle] = useState(initialPost.title || '');
  const [excerpt, setExcerpt] = useState(initialPost.excerpt || '');
  const [category, setCategory] = useState(initialPost.category || '');
  const [tags, setTags] = useState(initialPost.tags || []);
  const [content, setContent] = useState<ContentBlock[]>(
    initialPost.content || []
  );
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = () => {
    const post = {
      title,
      excerpt,
      category,
      tags,
      content,
      author: 'Current User', // Replace with actual user
      readTime: `${Math.ceil(content.reduce((acc, block) => 
        acc + (block.text?.split(' ').length || 0), 0) / 200)} min read`
    };
    onSubmit(post);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-bold border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
        />
        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={() => {
              if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setNewTag('');
              }
            }}
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-2 rounded hover:from-blue-500 hover:to-purple-600"
          >
            <PlusCircle size={25} />
          </button>
        </div>
      </div>

      <div className="mb-4">
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
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded hover:from-blue-500 hover:to-purple-600"
        >
          Save 
        </button>
      </div>
    </div>
  );
};

export default Editor;