import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    
    author:{
      type:String,
      default:'none'
    },
   
   
    slug:{
        type:String
    },
    rate:{
      type:String
    },
  
   
  },
  { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;