import Topper from "../models/topper.model.js";
import { errorHandler } from "../utils/error.js";

export const addTopper = async(req,res,next)=>{
    if(!req.body.f_name || !req.body.department || !req.body.package || !req.body.company || !req.body.position  ) {
        return next(errorHandler(400,'Please provide the credentials'));
    }
    const slug = (req.body.f_name+req.body.department + req.body.package  )
        .split('')
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    const newEvent = new Topper({
        ...req.body,
        slug,

    });
    try{
        const savedEvent  = await newEvent.save();
        res.status(200).json(savedEvent);

    }
    catch(err){
        next(err);
    }
}
export const getToppers = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        
        // Query object to filter posts based on request parameters
        const query = {
            ...(req.query.title && { userId: req.query.title }),
            ...(req.query.author && { author: req.query.author }),
            ...(req.query.package && { package: req.query.package }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.comapany && { company: req.query.company }),
            ...(req.query.position && { position: req.query.position }),
            ...(req.query.feedback && { feedback: req.query.feedback }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { desc: { $regex: req.query.searchTerm, $options: 'i' } },
                    { comapany: { $regex: req.query.searchTerm, $options: 'i' } },
                    { slug: { $regex: req.query.searchTerm, $options: 'i' } },
                    { author: { $regex: req.query.searchTerm, $options: 'i' } },
                    { position: { $regex: req.query.searchTerm, $options: 'i' } },
                    { package: { $regex: req.query.searchTerm, $options: 'i' } },
                    { feedback: { $regex: req.query.searchTerm, $options: 'i' } },
                
                ],
            }),
        };

        const posts = await Topper.find(query)
            .sort({ createdAt: -1 }) // Sort posts by createdAt in descending order
            .skip(startIndex)
            .limit(limit);

        const totalToppers = await Topper.countDocuments(query);

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthPosts = await Topper.countDocuments({
            ...query,
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalToppers,
            lastMonthPosts,
        });
    } catch (error) {
        next(error);
    }
};



export const deleteToppers = async (req, res, next) => {
    
    try {
        await Topper.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted");
    } catch (error) {
        next(error);
    }
};