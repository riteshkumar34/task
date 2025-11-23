import Note from "../models/Note.js";

// GET all notes of logged-in user
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// CREATE note linked to logged-in user
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      user: req.user._id,  // attach owner
      title,
      content,
    });

    await newNote.save();
    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// GET single note (only if owned)
export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// UPDATE note (only if owned)
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE note (only if owned)
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
