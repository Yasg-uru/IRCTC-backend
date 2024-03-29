import mongoose from "mongoose";
const connectDatabase=async function(){
try {
    const response=await mongoose.connect(`mongodb://127.0.0.1:27017/railway-reservation`)
    console.log(`database is connected with ${response.connection.host }`)
} catch (error) {
    console.log(`error is occured in connection of database :${error?.message}`)
}
}
export default connectDatabase;