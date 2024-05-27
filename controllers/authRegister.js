const User = require("../models/user");
const { hashPassword } = require("../helpers/auth");
// import {nanoid} from "nanoid";

const authRegister = async (req, res) => {
  // destructure
  const { username, email, password, question, answer, userId } = req.body;
  console.log(userId);

  // validation
  if (!username) return res.status(400).send("username is required");
  if (!email) return res.status(400).send("email is required");
  if (!password || password.length < 8)
    return res
      .status(400)
      .send("password is required and should be atleast 8 charachters long");
  if (!answer) return res.status(400).send("answer is required");

  const exist = await User.findOne({ email });
  if (exist)
    return res
      .status(400)
      .send("User already exist please visit the login page");

  const hashedPassword = await hashPassword(password);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    question,
    answer,
    userId,
  });

  await user.save().then(() => {
    console.log("REGISTERED USER =>", user);
    return res.json({
      ok: true,
    });
  }).catch((err) => {
    console.log("REGISTRATION FAILED =>", err);
    return res.status(400).send("Error try again")
  });
};

module.exports = authRegister;
