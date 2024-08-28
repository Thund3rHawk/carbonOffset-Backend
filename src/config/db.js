import mongoose from "mongoose"; // Import mongoose directly

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL environment variable is not defined");
    }

    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `\n MongoDB connection success: connected to ${connectionInstance.connection.host} \n`
    );
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
