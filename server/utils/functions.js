import Notes from "../models/notes";
import Notebook from "../models/notebook";

export const getNotes = async () => {
  return await Notes.find({});
};

export const getData = async () => {
  return await {
    notebooks: await Notebook.find().sort({ updated_At: -1 }),
    notes: await Notes.find().sort({ updated_At: -1 })
  };
};

export const updateNote = async ({ id, title, content, notebook }) => {
  return await Notes.updateOne(
    { _id: id },
    { $set: { title: title, content: content, notebook: notebook } }
  );
};

export const newNote = async ({ notebook }) => {
  const data = new Notes({
    title: "",
    content: "",
    notebook: notebook
  });

  return await data
    .save(data)
    .then(data => {
      return data;
    })
    .catch(err => {
      // console.log(err);
    });
};

export const removeNote = async ({ id }) => {
  try {
    return await Notes.findOneAndRemove({ _id: id });
  } catch (error) {
    // console.log(error);
    return { error: error };
  }
};

export const newNotebook = async ({ notebook }) => {
  const data = new Notebook({
    name: notebook
  });
  return await data
    .save(data)
    .then(data => {
      return data;
    })
    .catch(err => {
      // console.log(err);
    });
};

export const removeNotebook = async ({ id }) => {
  try {
    const notebook = await Notebook.findOne({ _id: id }, function(err, obj) {
      if (err) return err;
      return obj;
    });
    await Notes.deleteMany({ notebook: notebook.name });
    return await Notebook.findOneAndRemove({ _id: id });
  } catch (error) {
    // console.log(error);
    return { msg: error };
  }
};
