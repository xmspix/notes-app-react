import {
  getData,
  updateNote,
  newNote,
  removeNote,
  newNotebook,
  removeNotebook
} from "../utils/functions";

import express from "express";

const api = express.Router();

api.get("/data/", (req, res) => {
  getData().then(data => res.send(data));
});

api.post("/update", (req, res) => {
  updateNote(req.body).then(data => res.send(data));
});

api.post("/new", (req, res) => {
  newNote(req.body).then(data => res.send(data));
});

api.post("/remove", (req, res) => {
  removeNote(req.body).then(data => res.send(data));
});

api.post("/new-notebook", (req, res) => {
  newNotebook(req.body).then(data => res.send(data));
});

api.post("/remove-notebook", (req, res) => {
  removeNotebook(req.body).then(data => res.send(data));
});

module.exports = api;
