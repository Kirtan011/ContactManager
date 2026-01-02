import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app=express();
const port=5000;

app.use(cors());


app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})