import mongoose from 'mongoose' ;
const connectDB = async() => {
  try {
   await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
   console.log("Databases connected");
   mongoose.connection.on('connected',()=>console.log("Mongoose connecttion event triggred"));
   mongoose.connection.on('err',(err) => console.log("Error Occured"));
  }
  catch(error){
    console.log("Database connection failed !");
    process.exit(1);
  }
};
export default connectDB ;