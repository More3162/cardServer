import mongoose from "mongoose";

const CONNECTION = "";

const connectToAtlasDb = async () => {
    try {
        await mongoose.connect(CONNECTION);
        console.log('Successfully connected to MongoDB in Atlas');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
    }
}

export default connectToAtlasDb;