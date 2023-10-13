const Note = require('../model/note.model');
exports.home = async (req, res) => {
  try {
    res.json(null);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ created_at: 1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.getRandomNote = async (req, res) => {
  try {
    const notes = await Note.find();
    shuffleArray(notes);
    const randomIndex = Math.floor(Math.random() * notes.length);
    const randomNote = notes[randomIndex];

    res.json(randomNote);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
exports.createNote = async (req, res) => {
  const { title, body } = req.body;
  try {
    const newNote = new Note({ title, body });
    await newNote.save();
    res.json(newNote);
  } catch (err) {
    res.status(400).json({ error: 'Validation error' });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateNote = async (req, res) => {
  const { title, body } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(deletedNote);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
