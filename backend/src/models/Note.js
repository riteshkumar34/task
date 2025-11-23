import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // add this
    title: {
      type: String,
      required: true, // typo fix: requires → required
    },
    content: {
      type: String,
      required: true, // typo fix
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
