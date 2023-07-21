import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then((result) => console.log(`DB connected!`))
    .catch((err) => console.log(`failed to connect ${err}`));
};

export default connectDB;
