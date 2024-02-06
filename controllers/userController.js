import User from "../models/user.js";
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
const getAllUser = async (req, res, next) => {
  const users = await getAllUsersRepo();
  res.send(users);
};

// Get one user
const getOneUser = async (req, res, next) => {
  let user = await getOneUserRepo(req.params.id);

  if (!user) {
    res.json(
      new CustomErrorHandler(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.json(user);
};

// Create a new user
const addUser = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.json(new CustomErrorHandler("Please provide all the fields", 400));
    return;
  }

  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      res.json(new CustomErrorHandler("Password could not be hashed", 500));
      return;
    }
    const user = createUserRepo(new User(req.body.name, req.body.email, hash));
    res.status(201).json(user);
  });
};

// Update a user
const updateUser = async (req, res, next) => {
  let id = req.params.id;
  let userResult = await getOneUserRepo(id);

  if (!userResult) {
    res
      .status(404)
      .json(
        new CustomErrorHandler(
          `User not found with id of ${req.params.id}`,
          404
        )
      );
    return;
  }

  try {
    const user = await updateUserRepo(
      new User(req.body.name, req.body.email, req.body.password),
      id
    );
    res.status(200).json(user);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  await deleteUserRepo(req.params.id).then((result) => {
    res.status(200).json(result);
  });
};

// Login a user
const login = async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  const user = await getOneUserRepoByEmail(email).then((user) => {
    if (!user) {
      res.json(new CustomErrorHandler("User not found", 404));
      return;
    }
    // Compare the password with the hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.json(new CustomErrorHandler("Password could not be compared", 500));
        return;
      }
      if (result) {
        let token = Jwt.sign({ username: user.email }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        // Set the token in the header
        res.setHeader("Authorization", token);
        res.status(200).json({ message: "Login successful" });
      } else {
        res.json(new CustomErrorHandler("Password is incorrect", 401));
      }
    });
  });
};

export { getAllUser, getOneUser, addUser, updateUser, deleteUser, login };
