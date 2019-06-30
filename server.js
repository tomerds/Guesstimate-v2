
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let nextId = 2;

function getNewId() {
  return nextId++;
}


let questions = [
  {
    id: 0,
    title: 'First Question',
    content: 'How many trees are there in the amazon rain forrest?',
    answer: 390000000000,
  },
  {
    id: 1,
    title: 'Second Question',
    content: 'At its height in 1913, what percentage of the world population did the British Empire estimatedly rule over?',
    answer: 23,
  },
];


app.use(cors());
app.use(bodyParser.json());

app.get('/questions', (req, res) => {
  res.status(200).json(questions);
});

app.post('/questions', (req, res) => {
  const note = { id: getNewId(), ...req.body };
  questions = [...questions, note];
  res.status(201).json(questions);
});

app.put('/questions/:id', (req, res) => {
  const { id } = req.params;
  let noteIndex = questions.findIndex(note => note.id == id);

  if (noteIndex >= 0) {
    questions[noteIndex] = { ...questions[noteIndex], ...req.body };
    res.status(200).json(questions);
  } else {
    res
      .status(404)
      .json({ message: `The note with id ${id} does not exist.` });
  }
});

app.delete('/questions/:id', (req, res) => {
  questions = questions.filter(note => note.id != req.params.id);
  res.status(200).json(questions);
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});