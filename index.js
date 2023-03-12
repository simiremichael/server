import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import propertyRoute from './routes/propertyRoute.js';
import userRoute from './routes/userRoute.js' 
import companyRoute from './routes/companyRoute.js';
import agentRoute from './routes/agentRoute.js' 
import  cookieParser from'cookie-parser';

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cookieParser())
 //app.use(cors());

 app.use(cors({
  origin: ["https://my-property-finder.vercel.app", "http://localhost:3000"],
  preflightContinue: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  credentials: true,
}))

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://my-property-finder.vercel.app");
//   res.header("Access-Control-Allow-Credentials", true );
//   res.header("Access-Control-Allow-Origin", "https://my-property-finder.vercel.app");
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//     next();
// }) 

app.use('/properties', propertyRoute);
app.use('/users', userRoute);
app.use('/companies', companyRoute);
app.use('/agents', agentRoute);

const PORT = process.env.PORT || 5000;



mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
