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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cookieParser())
 //app.use(cors());



// origin: ['http://localhost:3000',
// "https://server-beige-nine.vercel.app"]

 app.use(cors({
  credentials: true,
  origin: ['http://localhost:5000', 'https://server-beige-nine.vercel.app']
}))

app.use('/properties', propertyRoute);
app.use('/users', userRoute);
app.use('/companies', companyRoute);
app.use('/agents', agentRoute);

const PORT = process.env.PORT || 5000;



mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
