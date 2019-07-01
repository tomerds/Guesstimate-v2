
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
    content: 'At its height in 1913, what percentage of the world population did the British Empire rule over?',
    answer: 23,
  },
  {
    id: 2,
    title: 'Third Question',
    content: 'How much does an iPhone 7 weigh (in grams)?',
    answer: 138,
  },
  {
    id: 3,
    title: 'Fourth Question',
    content: 'How many swipes are made on Tinder every day?',
    answer: 1600000000,
  },
  {
    id: 4,
    title: 'Fifth Question',
    content: 'How long is the river Nile (in km)?',
    answer: 6695,
  },
  {
    id: 5,
    title: 'Sixth Question',
    content: 'How much electricity is in an average bolt of lightning (in volts)?',
    answer: 1000000000,
  },
  {
    id: 6,
    title: 'Seventh Question',
    content: 'How much does SpaceX charge to launch a Falcon 9 Rocket (in USD)?',
    answer: 62000000,
  },
  {
    id: 7,
    title: 'Eighth Question',
    content: 'How many YouTube videos are watched per day?',
    answer: 5000000000,
  },
  {
    id: 8,
    title: 'Ninth Question',
    content: 'How far is Los Angeles to New Delhi as the crow flies (in km)?',
    answer: 12852.22,
  },
  {
    id: 9,
    title: 'Tenth Question',
    content: 'How many touchdown passes did Peyton Manning throw in his career?',
    answer: 539,
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