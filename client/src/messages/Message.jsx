import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
const Message = () => {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const { currentUser } = useSelector((state) => state.user); // Assuming 'currentUser' is stored in Redux state
	const messageListRef = useRef(null);

	const fetchMessages = async () => {
		try {
			const response = await fetch('/api/message/get-message');
			const data = await response.json();
			setMessages(data);
			scrollToBottom(); // Scroll to bottom after fetching new messages
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	const sendMessage = async () => {
		try {
            if(!message){
                toast.error('No message')
            }
			await fetch('/api/message/create-message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ author: currentUser.username, message }),
			});

			// Clear the message input after sending
			setMessage('');
			// Fetch messages to update the list
			fetchMessages();
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	useEffect(() => {
		fetchMessages(); // Fetch messages on component mount

		// Poll for new messages every 2 seconds
		const interval = setInterval(() => {
			fetchMessages();
		}, 2000);

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, []); // Run only once on mount

	// Function to scroll to the bottom of the message list
	const scrollToBottom = () => {
		if (messageListRef.current) {
			messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
		}
	};

	// Automatically scroll to bottom when messages change
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div>
            <Toaster/>
			<h2 className='test-center font-bold text-2xl mx-auto'>Tech Chat</h2>
            <p className='mx-auto'>use generous words towards others. if not we will report your account</p>
			<div
				ref={messageListRef}
				style={{
					height: '300px', // Adjust height as needed
					overflowY: 'auto', // Enable vertical scrollbar
					border: '1px solid #ccc',
					padding: '10px',
				}}
			>
				<ul>
					{messages.map((message) => (
						<li key={message._id}>
							<strong>{message.author}:</strong> {message.message}
						</li>
					))}
				</ul>
			</div>
			<div>
				<input
					type="text"
					placeholder="Type your message..."
                    className='mt-2 rounded-md'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className='bg-green-800 ml-2 text-white w-[50px] rounded-md' onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
};

export default Message;
