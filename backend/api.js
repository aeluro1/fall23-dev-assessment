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

/**
 * Helper function to overwrite database.js for post/put/delete requests
 */
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

/**
 * Handles POST add requests
 */
app.post("/api/bog/users", (req, res) => {
  // Respond with an error if the ID does not exist
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

/**
 * Handles PUT update requests
 */
app.put("/api/bog/users/:id", (req, res) => {
  // Create a new user, replacing the request body's ID with the endpoint ID as a sanity check
  const newUser = {
    ...req.body,
    id: req.params.id
  }

  // Respond with an error if the ID exists in the database
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

/**
 * Handles DELETE requests
 */
app.delete("/api/bog/users/:id", (req, res) => {
  // Respond with an error if the ID does not exist in the database
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
