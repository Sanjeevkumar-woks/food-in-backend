import { genPassword, addUser, getUserByName } from "../helper.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from 'jsonwebtoken';

const router = express.Router();

//Signup
//validate if username alrady present
//validate if password matches
//store the user details
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const isUserExist = await getUserByName(username);
  if (isUserExist) {
    res.status(400).send({ message: "Username alrady taken" });
    return;
  }
  if (
    !/^(?=.*[0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@!#%&]).{8,}$/g.test(
      password
    )
  ) {
    res.status(400).send({ message: "Password pattern doesnot match" });
    return;
  }
  const hashPassword = await genPassword(password);
  const result = await addUser(username, hashPassword);
  res.send(result);
});

//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userFromDb = await getUserByName(username);
  if (!userFromDb) {
    res.status(400).send({ message: "Invalid credentials" });
    return;
  }
  const sotredDbPassword = userFromDb.password;

  const isPasswordMatch = await bcrypt.compare(password, sotredDbPassword);
  if (!isPasswordMatch) {
    res.status(400).send({ message: "Invalid credentials" });
    return;
  }

  const token= jwt.sign({id :userFromDb._id},'MYSECRATE');
  res.send({"message":"Sucessfull Login","token":token});
});

export const usersRouter = router;
