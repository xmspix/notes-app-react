import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Notes = new Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String
    },
    user: {
      type: String
    },
    notebook: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", Notes, "notes");
