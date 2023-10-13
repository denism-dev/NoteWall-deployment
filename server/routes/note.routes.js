// note.routes.js
// note.routes.js

const NoteController = require('../controllers/note.controller');

module.exports = (app) => {

    // Get all notes
    app.get('/api/notes', NoteController.getAllNotes);

    // Delete a note
    app.get('/api/note/:id', NoteController.getNoteById);
    
    // Create a new note
    app.post('/api/note', NoteController.createNote);

    // Update a note
    app.put('/api/note/:id', NoteController.updateNote);

    // Delete a note 2
    app.delete('/api/note/:id', NoteController.deleteNote);

    // New route for generating a random note
    app.get('/api/notes/random', NoteController.getRandomNote);
}
