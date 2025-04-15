const mongoose = require("mongoose");
const {marked} = require("marked");
const slugify = require("slugify");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom"); 



const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window); 

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String, 
    },
    markdown: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false 
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: new Date()
    },
    
}); 
 
 

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;