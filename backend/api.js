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

// For post/put/delete requests, just overwrite database.js
function saveDB() {
  const db = "export const database = " + JSON.stringify(database, null, 4) + ";";
  fs.writeFile("./database.js", db, (err) => {
    if (err) {
      console.error("DB update failed");
      return 1;
    } else {
      console.log("DB update succeeded");
      return 0;
    }
  });
}

app.post("/api/bog/users", (req, res) => {
  if (database.some((user) => user.id === req.body.id)) {
    res.status(400).json(database.filter((user) => user.id === req.body.id)[0]);
  } else {
    database.push(req.body);
    if (saveDB()) {
      res.status(400);
    } else {
      res.status(200);
    }
    res.json(req.body);
  }
});

app.put("/api/bog/users/:id", (req, res) => {
  const newUser = {
    ...req.body,
    id: req.params.id
  }
  if (database.every((user) => user.id !== req.params.id)) {
    res.status(400).json(newUser);
  } else {
    database.forEach((user, idx, arr) => {
      if (user.id === req.params.id) {
        arr[idx] = newUser;
      }
    });
    if (saveDB()) {
      res.status(400);
    } else {
      res.status(200);
    }
    res.json(newUser);
  }
});

app.delete("/api/bog/users/:id", (req, res) => {
  if (database.every((user) => user.id !== req.params.id)) {
    res.status(400).json(req.body);
  } else {
    const idx = database.findIndex((user) => user.id === req.params.id);
    const ret = database[idx];
    database.splice(idx, 1);
    if (saveDB()) {
      res.status(400);
    } else {
      res.status(200);
    }
    res.json(ret);
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
