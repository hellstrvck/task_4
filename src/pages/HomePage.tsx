import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BlogCard } from '../components/BlogCard';
import { BlogPost } from '../components/BlogPost';
import { BlogPost as BlogPostType } from '../types/blog.types';
import { Pagination } from '../components/Pagination';

const POSTS_PER_PAGE = 8;

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  useEffect(() => {
    
    fetch('/data/blogs.json')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const BlogList = () => (
    <>
      <header className="header">
        <div className="header__content">
          <h1>Resources and insights</h1>
          <p>The latest industry news, interviews, technologies, and resources.</p>
        </div>
      </header>

      <main className="main-content">
        <div className="filters">
          <div className="search-wrapper">
            <input
              type="search"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="sort-wrapper">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className="sort-select"
            >
              <option value="date">Sort by date</option>
              <option value="title">Sort by title</option>
            </select>
          </div>
        </div>

        <div className="posts-grid">
          {paginatedPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPosts.length / POSTS_PER_PAGE)}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );

  return (
    <div className="home-page">
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/post/:id" element={<BlogPost posts={posts} />} />
      </Routes>
    </div>
  );
}; 