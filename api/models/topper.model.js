import mongoose from 'mongoose';

const topperSchema = new mongoose.Schema(
  {
    f_name: {
      type: String,
      required: true,
    },
   
    department: {
      type: String,
      required: true,
    },
    package:{
      type: String,
      default:'none'


    },
    position:{
        type:String,

    },
    company:{
        type:String
    },
    author:{
      type:String,
      
    },
    feedback:{
        type:String,

    },
  
    
    img:{
        type: String
    },
    slug:{
        type:String
    }
    
  
   
  },
  { timestamps: true }
);

const Topper = mongoose.model('Topper', topperSchema);

export default Topper;