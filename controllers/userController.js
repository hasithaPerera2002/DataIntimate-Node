import User from "../models/userModel";
import asyncErrorHandler from "../handlers/asyncErrorHandler";
import CustomErrorHandler from "../handlers/customErrorHandler";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const getAllUser = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find({}, { password: 0 });
  res.json(users);
});

const getOneUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id, { password: 0 });
  if (!user) {
    return next(
      new CustomErrorHandler(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.json(user);
});

const createUser = asyncErrorHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return next(new CustomErrorHandler("Password could not be hashed", 500));
    }
    const user = await User.create({ ...req.body, password: hash });
    res.status(201).json(user);
  });
});

const updateUser = asyncErrorHandler(async (req, res, next) => {
  await User.updateOne({ _id: req.params.id }, { $set: req.body }).then(
    (result) => {
      res.status(200).json(result);
    }
  );
});

const deleteUser = asyncErrorHandler(async (req, res, next) => {
  await User.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json(result);
  });
});

const login = asyncErrorHandler(async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  const user = await User.findOne({ email: email }, { password: 0 }).then(
    (user) => {
      if (!user) {
        return next(new CustomErrorHandler("User not found", 404));
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return next(
            new CustomErrorHandler("Password could not be compared", 500)
          );
        }
        if (result) {
          let token = Jwt.sign(
            { username: user.email },
            process.env.SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );
          res.setHeader("Authorization", token);
          res.status(200).json({ message: "Login successful" });
        } else {
          return next(new CustomErrorHandler("Password is incorrect", 401));
        }
      });
    }
  );
});

export { getAllUser, getOneUser, createUser, updateUser, deleteUser };
