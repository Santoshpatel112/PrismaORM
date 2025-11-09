import express from 'express';
const app=express();
import dotenv from "dotenv";
dotenv.config();
const PORT=process.env.PORT ||3000;

// Middleware must come before routes
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
})

//  Route file
import route from './routes/index.js';
app.use(route);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})