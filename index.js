import express from 'express';
import cors from 'cors';
import mainRoute from './routes/mainRoute.js';

const app = express();
app.use(cors()); // to allow cross origin requests
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

const PORT = 3001;

app.use('/api/v1/', mainRoute);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server has started at at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();