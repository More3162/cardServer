import mongoose from "mongoose";
import connectToLocalDb from "./mongodb/connectToMongodbLocally.js";
import connectToAtlasDb from "./mongodb/connectToAtlas.js";

const ENVIRONMENT = "development";

const connectToDb = async () => {
    if (ENVIRONMENT === "development") {
        await connectToLocalDb();
    } else if (ENVIRONMENT === "production") {
        await connectToAtlasDb();
    }
}

export default connectToDb;