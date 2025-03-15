import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Connected to MongoDB");
    return;
  }
  if (connectionState === 2) {
    console.log("connecting to MongoDB...");
    return;
  }
  try {
    mongoose.connect(MONGODB_URI, {
      dbName: "next14restapi",
      bufferCommands: true,
    });
    console.log("connecting to MongoDB...");
  } catch (e) {
    console.log("error connecting to MongoDB", e);

    throw new Error(e);
  }
};
export default connect;