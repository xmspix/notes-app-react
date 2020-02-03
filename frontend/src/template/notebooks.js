import React, { useContext } from "react";
import context from "../utils/context";
import { limitText } from "../utils/functions";
import { fetcher } from "../utils/fetcher";
import Svg from "../components/svg";

import {
  newNotebook,
  removeNotebook,
  toggleNotebook
} from "../utils/notebooks";

const Notebooks = () => {
  const globalState = useContext(context);

  const handleNewNotebook = () => {
    const body = {
      notebook: document.getElementsByClassName("newNotebook")[0].value
    };
    fetcher("/api/new-notebook", body).then(data => {
      newNotebook(globalState, data);
      globalState.setModal(false);
    });
  };

  const handleRemoveNotebook = id => {
    const body = {
      id: id
    };
    fetcher("/api/remove-notebook", body).then(data => {
      removeNotebook(globalState, data, id);
    });
  };

  const modalConfirm = id => {
    globalState.setModal({
      title: "Alert",
      content:
        "Are you sure you want to delete this notebook and all notes inside ?",
      footer: (
        <>
          <button
            className="btn btn-secondary"
            onClick={() => globalState.setModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              handleRemoveNotebook(id);
              globalState.setModal(false);
            }}
          >
            Yes!
          </button>
        </>
      ),
      show: true,
      close: () => globalState.setModal(false)
    });
  };

  const modalNewNotebook = () => {
    globalState.setModal({
      title: "New notebook",
      content: (
        <>
          Please choose a name for the new notebook
          <input
            type="text"
            className="newNotebook"
            placeholder="Notebook name"
          />
        </>
      ),
      footer: (
        <button className="btn btn-primary" onClick={() => handleNewNotebook()}>
          Add
        </button>
      ),
      show: true,
      close: () => globalState.setModal(false)
    });
  };

  const Notebooks = () => {
    return globalState.notebooks.map(itm => (
      <li
        className={
          itm.name === globalState.activeNotebook
            ? "sidebar__notebook--item active"
            : "sidebar__notebook--item"
        }
        key={itm._id}
        onClick={e => toggleNotebook(globalState, e, itm)}
        title={itm.name}
      >
        <svg className="sidebar__menu--icon">
          <use xlinkHref="/img/sprite.svg#icon-journal"></use>
        </svg>
        {limitText(itm.name, 15)}
        <div
          className="sidebar__notebook--remove"
          onClick={() => modalConfirm(itm._id)}
        >
          <Svg icon="icon-trash" />
        </div>
      </li>
    ));
  };

  return (
    <div className="sidebar">
      <nav className="sidebar__notebook">
        <div
          className="sidebar__notebook--add"
          onClick={() => modalNewNotebook()}
        >
          <Svg icon="icon-add" />
        </div>
        <ul className="sidebar__notebook--items">
          <Notebooks />
        </ul>
      </nav>
    </div>
  );
};

export default Notebooks;
