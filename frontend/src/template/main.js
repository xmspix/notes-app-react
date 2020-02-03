import React, { useContext, useRef } from "react";
import context from "../utils/context";
import Toolbar from "../components/toolbar";
import { currentNotebook, limitText, isEmpty } from "../utils/functions";
const Main = () => {
  const globalState = useContext(context);

  const title = useRef();
  const content = useRef();
  const id = globalState.current ? globalState.current._id : null;

  const labelTitle = useRef();
  const labelContent = useRef();

  const handleUpdate = e => {
    isEmpty(title.current.innerText)
      ? labelTitle.current.classList.add("active")
      : labelTitle.current.classList.remove("active");

    isEmpty(content.current.innerHTML)
      ? labelContent.current.classList.add("active")
      : labelContent.current.classList.remove("active");

    // Title
    document.querySelector(
      ".sidebar-notes--item__container.active"
    ).children[0].innerText = limitText(title.current.innerText, 15);

    // Content
    document.querySelector(
      ".sidebar-notes--item__container.active"
    ).children[1].innerText = limitText(content.current.innerText, 15);

    const data = {
      title: title.current.innerText,
      content: content.current.innerHTML,
      notebook: currentNotebook(),
      id: id
    };

    fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const editNote = globalState.notes.filter(itm => itm._id === data.id)[0];
    editNote.title = data.title;
    editNote.content = data.content;
  };

  return (
    <div
      className={
        globalState.notebooks.length > 0 && globalState.filterNotes.length > 0
          ? "main"
          : "main hide"
      }
    >
      <h1
        className="main--title"
        id="title"
        contentEditable="true"
        ref={title}
        onInput={handleUpdate}
        suppressContentEditableWarning={true}
        tabIndex="1"
      >
        {globalState.current ? globalState.current.title : null}
      </h1>
      <label
        htmlFor="title"
        className={
          isEmpty(globalState.current ? globalState.current.title : null)
            ? "labelTitle active"
            : "labelTitle"
        }
        ref={labelTitle}
        onClick={() => title.current.focus()}
      >
        H1
      </label>
      <Toolbar />
      <div
        className="main--section"
        id="section"
        contentEditable="true"
        ref={content}
        onInput={handleUpdate}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{
          __html: globalState.current ? globalState.current.content : null
        }}
        tabIndex="2"
      ></div>
      <label
        htmlFor="section"
        className={
          isEmpty(globalState.current ? globalState.current.content : null)
            ? "labelContent active"
            : "labelContent"
        }
        ref={labelContent}
        onClick={() => content.current.focus()}
      >
        Content
      </label>
    </div>
  );
};

export default Main;
