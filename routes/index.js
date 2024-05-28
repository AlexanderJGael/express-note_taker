const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { database } = require('../db/db.json');

// GET Route for retrieving all the notes
router.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting a new note
router.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  console.log(req.body);
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});
/* 
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile(database).then((data) => {
    const note = JSON.parse(data);
    const result = note.filter((note) => note.id !== noteId);
    writeToFile(database, result);
    res.json(result);
  })
  .catch((err) => {
    console.log('Error: ', err);
  })
  }) */

router.get('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile(database).then((data) => {
    const notes = JSON.parse(data);
    const result = notes.filter((note) => note.note_id === noteId);
    res.json(result);
  });
})

module.exports = router;
