import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function ViewEvents() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/event/get-events`);
        if (res.ok) {
          const data = await res.json();
          setUserPosts(data.posts);
        } else {
          throw new Error("Failed to fetch Events");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/event/delete-events/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-3 mb-3">
        All Upcoming Events
      </h1>
      {userPosts.length === 0 ? (
        <p className="text-center text-blue-600 text-xl font-semibold mt-5">Oups! No upcoming events are there stay tuned to grab golden opportunity soon</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ml-3 mr-3">
          {userPosts.map((post) => (
            <Card key={post._id}>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title} ⭐⭐
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {post.desc ? post.desc.trim().split(" ").slice(0, 50).join(" ") : 'No description available'}...
              </p>
              <p className="font-medium text-gray-700 dark:text-gray-400">
                Posted by: {post.author}
              </p>
              <p className="font-medium text-red-700 dark:text-gray-400">
                Created{" "}
                {Math.floor(
                  (Date.now() - new Date(post.createdAt).getTime()) / 60000
                )}{" "}
                min ago
              </p>
              <p className="font-medium text-green-700 dark:text-gray-400">
                Will be held on {post.date}
              </p>
              <Link to={`/event/${post.slug}`}>
                <button className="bg-blue-700 text-white h-[40px] rounded-md w-[300px]">
                  View Events
                </button>
              </Link>
              {currentUser.isAdmin && (
                <span
                  onClick={() => {
                    setShowModal(true);
                    setPostIdToDelete(post._id);
                  }}
                  className='font-medium text-red-500 hover:underline cursor-pointer'
                >
                  Delete
                </span>
              )}
            </Card>
          ))}
        </div>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
