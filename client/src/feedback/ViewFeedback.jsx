import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function ViewFeedback() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/feedback/get-feedback`);
        if (res.ok) {
          const data = await res.json();
          setUserPosts(data.posts);
        } else {
          throw new Error("Failed to fetch Feedbacks");
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
        `/api/feedback/delete-feedback/${postIdToDelete}/${currentUser._id}`,
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
        All Feedbacks
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ml-3 mr-3">
        {userPosts.map((post) => (
          <Card key={post._id}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title} 
            </h5> <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Rated - {post.rate} 
            </h5><p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.desc} 
            </p>
           
            <p className="font-medium text-gray-700 dark:text-gray-400">
              given by: {post.author}
            </p>
            <p className="font-medium text-red-700 dark:text-gray-400">
              Created{" "}
              {Math.floor(
                (Date.now() - new Date(post.createdAt).getTime()) / 60000
              )}{" "}
              min ago
            </p>
            
           
            {
              currentUser.isAdmin&& (
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
