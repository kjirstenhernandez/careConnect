import express from 'express';
import cors from 'cors';
import router from './routes';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello from CareConnect server!');
});

// Choose your port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
