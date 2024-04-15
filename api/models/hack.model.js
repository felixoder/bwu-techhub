import mongoose from 'mongoose';

const hackSchema = new mongoose.Schema(
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
    teams: {
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
    skill: {
      type: String,
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

const Hack = mongoose.model('Hack', hackSchema);

export default Hack;