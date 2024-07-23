import mongoose from "mongoose";

const connectDB = async ( ) =>{
    try{
        const mongoURI = 'mongodb://localhost:27017/solid';
        await mongoose.connect(mongoURI);
        console.log('Mongo connected ...');
    }
    catch(err){
        console.error('MongoDB connection error : ',err.message);
        process.exit(1);

    }
};
export default connectDB;