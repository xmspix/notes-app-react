import React, { useContext, useRef } from "react";
import context from "../utils/context";
import Svg from "../components/svg";

import {
  toggleElement,
  currentNotebook,
  createElementFromHTML,
  limitText,
  clearFields
} from "../utils/functions";

import { fetcher } from "../utils/fetcher";

import { newNote, removeNote, search } from "../utils/notes";

const Notes = () => {
  const globalState = useContext(context);

  const searchbox = useRef();

  const handleNewNote = () => {
    const body = {
      notebook: currentNotebook()
    };
    fetcher("/api/new", body).then(data => {
      newNote(globalState, data);
      clearFields();
    });
  };

  const handleRemoveNote = id => {
    const body = {
      id: id
    };
    fetcher("/api/remove", body).then(data => {
      removeNote(globalState, data, id);
    });
  };

  const Notes = () => {
    return globalState.filterNotes.map((itm, x) => (
      <li className="sidebar-notes--item" key={itm._id}>
        <div
          className={
            globalState.current._id === itm._id
              ? "sidebar-notes--item__container active"
              : "sidebar-notes--item__container"
          }
          onClick={e => {
            toggleElement(e, ".sidebar-notes--item__container");
            globalState.setState({ ...globalState, current: itm });
          }}
        >
          <div className="sidebar-notes--item__container--title">
            {limitText(itm.title, 25)}
          </div>
          <div className="sidebar-notes--item__container--content">
            {limitText(createElementFromHTML(itm.content), 25)}
          </div>
        </div>
        <div
          className="sidebar-notes--item__container--remove"
          onClick={() => handleRemoveNote(itm._id)}
        >
          <Svg icon="icon-trash" />
        </div>
      </li>
    ));
  };

  return (
    <nav
      className={
        globalState.notebooks.length > 0
          ? "sidebar-notes"
          : "sidebar-notes hide"
      }
    >
      <div className="sidebar-notes__header">
        <input
          type="text"
          placeholder="Search Notes"
          ref={searchbox}
          onChange={() => search(globalState, searchbox.current.value)}
        />
        <div onClick={() => handleNewNote()}>
          <Svg icon="icon-create" />
        </div>
      </div>
      <ul className="sidebar-notes--items">
        <Notes />
      </ul>
    </nav>
  );
};

export default Notes;
