const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 8888;

const posts = {

}

app.get('/posts', (req, res) => {
  res.status(200).send(posts);
})

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  }

  res.status(201).send(posts[id]);

})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
