import User from "../models/user.js";
import asyncErrorHandler from "../handlers/asyncErrorHandler.js";
import CustomErrorHandler from "../handlers/customErrorHandler.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import {
  createUserRepo,
  deleteUserRepo,
  getAllUsersRepo,
  getOneUserRepo,
  updateUserRepo,
  getOneUserRepoByEmail,
} from "../repo/userRepo.js";

// Get all users
const getAllUser = asyncErrorHandler(async (req, res, next) => {
  const users = await getAllUsersRepo();
  res.json(users);
});

// Get one user
const getOneUser = asyncErrorHandler(async (req, res, next) => {
  const user = getOneUserRepo(req.params.id);
  if (!user) {
    return next(
      new CustomErrorHandler(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.json(user);
});

// Create a new user
const addUser = asyncErrorHandler(async (req, res, next) => {
  console.log("addUser");
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return next(new CustomErrorHandler("Password could not be hashed", 500));
    }
    const user = createUserRepo(new User(req.body.name, req.body.email, hash));
    res.status(201).json(user);
  });
});

// Update a user
const updateUser = asyncErrorHandler(async (req, res, next) => {
  let userResult = getOneUserRepo(req.params.id);

  if (!userResult) {
    return next(
      new CustomErrorHandler(`User not found with id of ${req.params.id}`, 404)
    );
  }
  await updateUserRepo(
    new User(req.body.name, req.body.email, req.body.password)
  ).then((result) => {
    res.status(200).json(result);
  });
});

// Delete a user
const deleteUser = asyncErrorHandler(async (req, res, next) => {
  await deleteUserRepo(req.params.id).then((result) => {
    res.status(200).json(result);
  });
});

// Login a user
const login = asyncErrorHandler(async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  const user = await getOneUserRepoByEmail(email).then((user) => {
    if (!user) {
      return next(new CustomErrorHandler("User not found", 404));
    }
    // Compare the password with the hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return next(
          new CustomErrorHandler("Password could not be compared", 500)
        );
      }
      if (result) {
        let token = Jwt.sign({ username: user.email }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        // Set the token in the header
        res.setHeader("Authorization", token);
        res.status(200).json({ message: "Login successful" });
      } else {
        return next(new CustomErrorHandler("Password is incorrect", 401));
      }
    });
  });
});

export { getAllUser, getOneUser, addUser, updateUser, deleteUser, login };
