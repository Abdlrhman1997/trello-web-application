import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://abdlrhmanhegazy4:randycena619@cluster1.ofu8dzb.mongodb.net/assigment66`
    )
    .then((result) => console.log(`DB connected!`))
    .catch((err) => console.log(`failed to connect ${err}`));
};

export default connectDB;
