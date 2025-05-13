import { JSX } from "react/jsx-runtime";

export interface Article {
  map(arg0: (article: any) => JSX.Element): import("react").ReactNode;
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category?: string;
  imageUrl?: string;
  heroImage?: string;
  content?: { type: string; text: string }[];
  tags: string[];
}

export interface articleState {
  featuredArticles: Article[];
  latestArticles: Article[];
  articles: Article[];
}

export interface FeaturedArticle {
  featuredArticles: Article[];
}
