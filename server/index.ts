import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);  //Mounting the router for /api calls

app.use(express.static(path.join(__dirname, '../dist'))); //where to get static files

const PORT = process.env.PORT || 3000; // declaring port use

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
