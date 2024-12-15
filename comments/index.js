const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const port = process.env.COMMENTS_PORT || 3404;

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
}); 


app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const {content} = req.body;

  //set the existing array of comments if it exists
  //if it does not exist, set an empty array
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({id: commentId, content});

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments)
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})