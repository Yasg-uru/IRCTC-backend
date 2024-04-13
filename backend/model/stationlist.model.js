import mongoose, { Schema ,model} from "mongoose";
const stationlistSchema=new Schema({
    stations:{
        type:[String],
        required:true
    }
})
const stationmodel=model("stationlist",stationlistSchema);
export default stationmodel;
