import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button, Modal, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function About() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/topper/get-topper?order=desc`);
        if (res.ok) {
          const data = await res.json();
          // Sort posts by createdAt field in descending order
          const sortedPosts = data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setUserPosts(sortedPosts);
        } else {
          throw new Error("Failed to fetch Toppers");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/topper/delete-topper/${postIdToDelete}/${currentUser._id}`,
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
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center font-bold text-3xl mb-8">About CSE Department of Brainware University</h1>

      <div className="mb-8">
        <ul className="max-w-md space-y-4 text-gray-500 list-disc list-inside dark:text-gray-800 mx-auto">
          <li>A Good Quality Faculties</li>
          <li>High Quality Labs</li>
          <li>Awesome Events and Hackathons and many more.....</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-4xl text-center mb-5">Our Bright Stars⭐</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner color="info" size="xl" />
          </div>
        ) : userPosts.length === 0 ? (
          <p className="text-center text-blue-600 text-xl font-semibold">Oops! No Toppers are there</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <Card key={post._id}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.f_name} ⭐⭐
                </h5>
                <p className="font-medium text-gray-700 dark:text-gray-400">CTC {post.package} LPA</p>
                <p className="font-medium text-gray-700 dark:text-gray-400">company {post.company}</p>
                <img src={post.img} alt={post.f_name} className="w-full h-64 object-cover rounded-t-lg" />
                <p className="font-medium text-red-700 dark:text-gray-400">
                  Created {Math.floor((Date.now() - new Date(post.createdAt).getTime()) / 60000)} min ago
                </p>
                <Link to={`/topper/${post.slug}`}>
                  <Button color="primary" className="w-full">
                    View Topper Details
                  </Button>
                </Link>
                {currentUser && currentUser.isAdmin && (
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }}
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this topper?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}