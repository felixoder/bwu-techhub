import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

export default function Topper() {
  const { postslug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/topper/get-topper?slug=${postslug}`);
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
        const res = await fetch(`/api/topper/get-topper`);
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
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">⭐⭐⭐⭐ {post.f_name} ⭐⭐⭐⭐</h1>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <img className="w-full h-64 object-cover" src={post.img} alt={post.f_name} />
          <div className="p-6">
            <p className="font-bold text-lg mb-2">Package (CTC) {post.package} LPA</p>
            <p className="font-bold text-lg mb-2">Company- {post.company}</p>
            <p className="font-bold text-lg mb-2">Job Role - {post.position}</p>
            <p className="font-bold text-lg mb-2">Some Golden words from our topper: </p>
            <p className="text-gray-700 mb-4"><FaQuoteLeft />{post.feedback}<FaQuoteRight /></p>
            <p className="text-gray-500 text-sm">Created by {post.author}</p>
          </div>
        </div>
      </div>
    </main>
  );
}