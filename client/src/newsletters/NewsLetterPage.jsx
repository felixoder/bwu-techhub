import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function NewsLetterPage() {
  const { postslug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/newsletter/get-newsletters?slug=${postslug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (data.posts.length === 0) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postslug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/newsletter/get-newsletters`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <main className="flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
      ⭐⭐⭐⭐  NewsLetter of {post.month}, {post.year} ---  {post.title} ⭐⭐⭐⭐
      </h1>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      
      
   
     
   
   
      <h2 className="text-center font-bold text-3xl mt-8">Read NewsLetter</h2>
      <iframe
        title="PDF Viewer"
        className="mt-10 p-3 max-h-[600px] w-full"
        src={post.pdf}
        width="100%"
        height="600"
      />
      <p className="mt-4 text-center">Created by {post.author}</p>
    </main>
  );
}