import Feedback from "../models/feedback.model.js";
import { errorHandler } from "../utils/error.js";

export const createFeed = async(req,res,next)=>{
    if(!req.body.title || !req.body.desc || !req.body.rate  ) {
        return next(errorHandler(400,'Please provide the credentials'));
    }
    const slug = (req.body.title+req.body.desc   )
        .split('')
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    const newFeed = new Feedback({
        ...req.body,
        slug,

    });
    try{
        const savedFeed  = await newFeed.save();
        res.status(200).json(savedFeed);

    }
    catch(err){
        next(err);
    }
}
export const getFeedbacks = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        
        // Query object to filter posts based on request parameters
        const query = {
            ...(req.query.title && { userId: req.query.title }),
            ...(req.query.desc && { desc: req.query.desc }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.author && { author: req.query.author }),
            ...(req.query.rate && { rate: req.query.rate }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { desc: { $regex: req.query.searchTerm, $options: 'i' } },
                    { slug: { $regex: req.query.searchTerm, $options: 'i' } },
                    { author: { $regex: req.query.searchTerm, $options: 'i' } },
                    { rate: { $regex: req.query.searchTerm, $options: 'i' } },
                
                ],
            }),
        };

        const posts = await Feedback.find(query)
            .sort({ createdAt: -1 }) // Sort posts by createdAt in descending order
            .skip(startIndex)
            .limit(limit);

        const totalFeedbacks = await Feedback.countDocuments(query);

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthPosts = await Feedback.countDocuments({
            ...query,
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalFeedbacks,
            lastMonthPosts,
        });
    } catch (error) {
        next(error);
    }
};



export const deleteFeedbacks = async (req, res, next) => {
    
    try {
        await Feedback.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted");
    } catch (error) {
        next(error);
    }
};
