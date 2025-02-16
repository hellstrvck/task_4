import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types/blog.types';
import { formatDate } from '../utils/dateFormatter';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="blog-card-link">
      <article className="blog-card">
        <div className="blog-card__image">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="blog-card__content">
          <span className="blog-card__category">{post.category}</span>
          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__description">{post.description}</p>
          <div className="blog-card__footer">
            <div className="blog-card__author">
              <img src={post.author.avatar} alt={post.author.name} />
              <span>{post.author.name}</span>
            </div>
            <span className="blog-card__date">{formatDate(post.date)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}; 