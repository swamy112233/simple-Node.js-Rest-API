const express=require('express');
const app=express();
app.use(express.json());
const user=require('./users');
const  mongoose= require('mongoose');
const users = require('./users');
mongoose.connect('mongodb+srv://swamy:swamy@atlascluster.fcrum5w.mongodb.net/?retryWrites=true&w=majority').then(()=>{
  console.log("data base is connected")
})




app.get('/getPaginatedUsers', async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
      const result = await user.find().limit(limit).skip(page*limit).exec()
      const data = {page: parseInt(page)+1, result}
      res.send(data)
  } catch (e) {
      console.log(e);
  }
});

app.get("/customer/:id",async(req,res)=>{
  try{
      const Data=await user.findById(req.params.id)
      return res.json(Data); 
  }
  catch(err){
      console.log(err.message)
  }
})


 

app.get('/aggregate',async (req,res) => {
  const aggregatorOpts = [
{
    "$group": {
        _id: "$city",
        count: { $sum: 1 }
    }
}
]

const result = await user.aggregate(aggregatorOpts);
res.send(result)
})


app.post('/post',async(req,res)=>{
  const {user}=req.body;
  try{
     const newdata=new users({user
      });
     await newdata.save();
     return res.json(await users.find())
  }
  catch(err){
     console.log(err.message)
  }
 } );

  
   


     app.listen(4000,()=>console.log("server is runing......."))
