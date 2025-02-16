import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost as BlogPostType } from '../types/blog.types';
import { formatDate } from '../utils/dateFormatter';

interface BlogPostProps {
  posts: BlogPostType[];
}

export const BlogPost: React.FC<BlogPostProps> = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="blog-post">
      <Link to="/" className="back-button">← Back to posts</Link>
      <article>
        <div className="blog-post__header">
          <span className="blog-post__category">{post.category}</span>
          <h1 className="blog-post__title">{post.title}</h1>
          <div className="blog-post__meta">
            <div className="blog-post__author">
              <img src={post.author.avatar} alt={post.author.name} />
              <div>
                <span className="author-name">{post.author.name}</span>
                <span className="post-date">{formatDate(post.date)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-post__image">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="blog-post__content">
          <p>{post.description}</p>
          {post.content && <div>{post.content}</div>}
          <button className="read-blog-button">Читать блог</button>
        </div>
      </article>
    </div>
  );
}; 