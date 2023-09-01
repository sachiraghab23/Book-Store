import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import bookRoute from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
app.use(cors());
/*
option 1: Allow all origins with default of cors(*)
  app.use(cors());
option 2: Allow custom origins
 app.use(
  cors({
    origin: 'http://localhost:3000,
    methods: ['GET','POST','PUT','DELETE']
    allowdHeaders: ['Content-Type'],
  })
 );
*/
app.get('/',(req,res)=>{
  return res.status(234).send('Welcome to our Book Store');
});
app.use('/books',bookRoute);
mongoose.connect(mongoDBURL)
.then(()=>{
  console.log("App connected to database");
  app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT}`);
  });
})
.catch((err)=>{
  console.log(err);
});