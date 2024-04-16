import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js";

// Controller function to create a new message
export const createMessage = async (req, res, next) => {
    try {
        // Check if message and author are provided in the request body
        if (!req.body.message || !req.body.author) {
            throw errorHandler(400, 'Please provide the message content and author');
        }

        // Create a new message instance using data from req.body
        const newMessage = new Message({
            author: req.body.author,
            message: req.body.message
        });

        // Save the new message to the database
        const savedMessage = await newMessage.save();

        // Respond with the saved message as JSON
        res.status(201).json(savedMessage);
    } catch (error) {
        // Pass any caught errors to the error handling middleware
        next(error);
    }
};

// Controller function to get all messages
export const getMessage = async (req, res, next) => {
    try {
        // Fetch all messages from the database
        const messages = await Message.find();

        // Respond with the messages as JSON
        res.json(messages);
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        console.error(error);
        next(errorHandler(500, 'Internal Server Error'));
    }
};
