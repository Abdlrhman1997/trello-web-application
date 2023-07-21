import userModel from "../../../../DB/model/user.model.js";
import bcrypt from "bcryptjs";
import cryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { userName, email, password, cPassword, phone, gender } = req.body;

  if (!(password === cPassword)) {
    return next(new Error("password doesn't match", { cause: 400 }));
  }
  const checkEmail = await userModel.findOne({ email });
  if (checkEmail) {
    return next(new Error("email already exist", { cause: 401 }));
  }

  const hashPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  const cryptPhone = cryptoJS.AES.encrypt(phone, "sasadanceonmsasa").toString();
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
    cPassword,
    phone: cryptPhone,
    gender,
  });
  const html = `<a href="http://localhost:3000/"></a>`;
  return res.json({ message: `new user ${user.userName} added succefully` });
  console.log({ userName, email, password, cPassword, phone, gender });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("wrong email or password", { cause: 404 }));
  }
  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) {
    return next(new Error("wrong email or password", { cause: 400 }));
  }
  const token = jwt.sign(
    { name: user.userName, id: user._id, isOnline: user.isOnline },
    "sasadanceonmsasa",
    { expiresIn: "1h" }
  );
  await userModel.updateOne({ email }, { isOnline: true, isDeleted: false });

  return res.json({ message: `user logged succefully`, token });
});
