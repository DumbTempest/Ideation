import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Mongo URI wrong");
}

let isConnected = false;

export async function dbConnect() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: "Idea_Site",
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("DB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("DB connection failed");
  }
}
