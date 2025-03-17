import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Cache the database connection
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connect = async () => {
  if (cached.conn) {
    console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "next14restapi",
      bufferCommands: true,
      // Add these options for better connection handling in serverless
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("New MongoDB connection established");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error("Error connecting to MongoDB", e);
    throw new Error(e);
  }
};

export default connect;