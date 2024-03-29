import mongoose, { Schema, model } from "mongoose";
const bookingSchema = new Schema({
  trainid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
  },
  date: {
    type: Date,
    required: true,
  },
  from_station: {
    type: String,
    required: true,
  },
  to_station: {
    type: String,
    required: true,
  },
  seats: 
    {
      coachType: String,
      categoryName:String,
      seatNumber: Number,
      isBooked:{
        type:Boolean,
        default:false
      }
    },
  
});
const bookingmodel = model("booking", bookingSchema);
export default bookingmodel;
