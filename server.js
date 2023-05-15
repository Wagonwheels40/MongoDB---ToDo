const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'todoapp';

app.use(express.json());

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  const db = client.db(dbName);
  const collection = db.collection('todos');

  // API endpoints
  app.get('/todos', (req, res) => {
    collection.find().toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post('/todos', (req, res) => {
    const newTodo = req.body;
    collection.insertOne(newTodo, (err, result) => {
      if (err) throw err;
      res.send(result.ops[0]);
    });
  });

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});
