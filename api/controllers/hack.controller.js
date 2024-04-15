import { errorHandler } from "../utils/error.js";
import Hack from "../models/hack.model.js";

export const createHack = async (req, res,next) => {
    

    if(!req.body.title || !req.body.desc || !req.body.skill || !req.body.teams ) {
        return next(errorHandler(400,'Please provide the credentials'));
    }
    const slug = (req.body.title+req.body.desc + req.body.skill + req.body.teams )
        .split('')
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    const newHack = new Hack({
        ...req.body,
        slug,

    });
    try{
        const savedHack  = await newHack.save();
        res.status(200).json(savedHack);

    }
    catch(err){
        next(err);
    }

}

export const getHacks = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        
        // Query object to filter posts based on request parameters
        const query = {
            ...(req.query.title && { userId: req.query.title }),
            ...(req.query.desc && { desc: req.query.desc }),
            ...(req.query.teams && { teams: req.query.teams }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.author && { author: req.query.author }),
            ...(req.query.skill && { skill: req.query.skill }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { desc: { $regex: req.query.searchTerm, $options: 'i' } },
                    { teams: { $regex: req.query.searchTerm, $options: 'i' } },
                    { slug: { $regex: req.query.searchTerm, $options: 'i' } },
                    { author: { $regex: req.query.searchTerm, $options: 'i' } },
                    { skill: { $regex: req.query.searchTerm, $options: 'i' } },
                
                ],
            }),
        };

        const posts = await Hack.find(query)
            .sort({ createdAt: -1 }) // Sort posts by year in ascending order
            .skip(startIndex)
            .limit(limit);

        const totalHacks = await Hack.countDocuments(query);

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthPosts = await Hack.countDocuments({
            ...query,
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalHacks,
            lastMonthPosts,
        });
    } catch (error) {
        next(error);
    }
};



export const deleteHack = async (req, res, next) => {
    
    try {
        await Hack.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted");
    } catch (error) {
        next(error);
    }
};
