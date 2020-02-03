import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Notebook = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notebook", Notebook, "notebook");
