import express from 'express';
import cors from "cors";
import { database } from './database.js';
import fs from "fs";

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/bog/users', (req, res) => {
    res.status(200).json(database);
});

app.get('/api/bog/users/:id', (req, res) => {
    const user = database.filter((user) => user.id === req.params.id)[0];
    res.status(200).json(user);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
