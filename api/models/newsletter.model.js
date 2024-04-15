import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
   
    month: {
      type: String,
      required: true,
    },
    year:{
      type: String,
      default:'none'


    },
    author:{
      type:String,
      
    },
  
    author:{
      type:String,
      default:'none'
    },
    
    pdf:{
        type: String
    },
    slug:{
        type:String
    }
  
   
  },
  { timestamps: true }
);

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

export default Newsletter;