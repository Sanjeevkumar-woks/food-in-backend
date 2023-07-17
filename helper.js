import { client } from "./index.js";
import  bcrypt from "bcrypt";
import { ObjectId } from "mongodb";


export function getFoodsByFilter(req) {
  return client.db("films").collection("Foods").find(req.query).toArray();
}
export function getFoodById(id) {
  return client.db("films").collection("Foods").findOne({ _id: ObjectId(id)});
}
export function deleteFoodById(id) {
  return client.db("films").collection("Foods").deleteOne({ _id: ObjectId(id) });
}
export function updateFoodById(id,updateFood) {
    return client.db("films").collection("Foods").updateOne({ _id: ObjectId(id) },{$set:updateFood});
  }
export async function addFoods(newFoods) {
  return await client.db("films").collection("Foods").insertMany(newFoods);
}

// users
export async function genPassword(password){
  const salt= await bcrypt.genSalt(10) //bcrypt.genSalt(no. of rounds)
  const hashedPassword=await bcrypt.hash(password,salt);
  return hashedPassword;
}

export async function addUser(username,hashPassword) {
  const newuser={
    "username":username,
    "password": hashPassword
  }
  return await client.db("films").collection("users").insertOne(newuser);
}

export async function getUserByName(username) {
 return await client.db("films").collection("users").findOne({"username":username});
}
