import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function EventsPage() {
  const { postslug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/event/get-events?slug=${postslug}`);
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
        const res = await fetch(`/api/event/get-events`);
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
      ⭐⭐ {post && post.title} ⭐⭐
      </h1>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">{post && (post.desc.length / 1000).toFixed(0)} mins read</span>
      </div>
      <h2 className="text-center font-bold text-3xl mt-8">Details about the Event</h2>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.desc }}
      ></div>
      <h2 className="text-center font-bold text-3xl mt-8">Speaker</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <p className="text-center font-bold text-2xl text-gray-800">
          {post.speaker} will deliver his/her valuable speech there
        </p>
        
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-7">
      <h2 className="text-center font-bold text-3xl mt-8">Fees</h2>
      <p className="text-center font-bold text-3xl text-gray-800">{post.fee} </p>
      </div>
     
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-7">
       
        <p className="text-center text-gray-600 mt-2">
          Last date to register for the Event is {post.date}
        </p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-7">
      <h2 className="text-center font-bold text-3xl mt-8">Registration link</h2>
      <a href={post.reg} className="text-center underline text-blue-500">
        {post.reg}
      </a>
      </div>
      <h2 className="text-center font-bold text-3xl mt-8">Manual Documentation</h2>
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