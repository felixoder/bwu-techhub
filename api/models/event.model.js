import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
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
    speaker: {
      type: String,
      required: true,
    },
    fee:{
      type: String,
      default:'none'


    },
    reg:{
      type:String,

    },
    date:{
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

const Event = mongoose.model('Event', eventSchema);

export default Event;