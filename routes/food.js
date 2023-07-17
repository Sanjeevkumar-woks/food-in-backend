import {
  getFoodsByFilter,
  getFoodById,
  deleteFoodById,
  addFoods,
  updateFoodById,
} from "../helper.js";
import express from "express";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const Foods = await getFoodsByFilter(req);
  res.send(Foods);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  //db.Foods.findOne({id:"102"})
  // var Food=Foods.find((x)=>x.id===id)
  const Food = await getFoodById(id);
  Food
    ? res.send(Food)
    : res.status(404).send({ message: "no Foods found" });
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const Food = await deleteFoodById(id);
  res.send(Food);
});

router.post("/", async (req, res) => {
  const newFoods = req.body;
  const result = await addFoods(newFoods);
  res.send(result);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateFood = req.body;
    const result = await updateFoodById(id,updateFood);
    res.send(result);
  });

export const foodRouter = router;




//normal CURD

// app.get('/Foods',(req,res)=>{
//     const {language}=req.query;
//     var Food=Foods.filter((x)=>x.language===language);
//     console.log(Food);
//    res.send(Food);
// })
// app.get('/Foods/:id',(req,res)=>{
//     const {id}=req.params;
//     console.log(id);
//      var Food=Foods.find((x)=>x.id===id)
//      console.log(Food);
//     res.send(Food);
// })
// app.get('/Foods', async (req,res)=>{
//     if(req.query.rating){
//         req.query.rating = + req.query.rating; 
//     }
//     const Foods = await client.db('films').collection("Foods").find(req.query).toArray();
//     res.send(Foods);
// });
// app.get('/Foods/:id', async (req,res)=>{
//     const {id}=req.params;
//     console.log(id);
//     //db.Foods.findOne({id:"102"})
//     // var Food=Foods.find((x)=>x.id===id)
//     const Food= await client.db('films').collection("Foods").findOne({id:id});
//      console.log(Food);
//     Food? res.send(Food):res.status(404).send({message:"no Foods found"});
// });
// app.delete('/Foods/:id', async (req,res)=>{
//     const {id}=req.params;
//     console.log(id);
//     //db.Foods.findOne({id:"102"})
//     // var Food=Foods.find((x)=>x.id===id)
//     const Food= await client.db('films').collection("Foods").deleteOne({id:id});
//      console.log(Food);
//     res.send(Food);
// });
// app.post('/Foods', async(req,res)=>{
//     const newFoods=req.body;
//     console.log(newFoods);
//     const result= await client.db('films').collection("Foods").insertMany(newFoods);
//     res.send(result);
// });