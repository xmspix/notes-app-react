import React, { useState } from "react";
import Template from "./template";

import Context from "./utils/context";

import Modal from "./components/modal";

const App = () => {
  const [state, setState] = useState({
    notes: [],
    notebooks: [],
    current: false,
    filterNotes: [],
    activeNotebook: false
  });

  const [modal, setModal] = useState(false);

  const store = {
    activeNotebook: state.activeNotebook,
    notebooks: state.notebooks,
    notes: state.notes,
    current: state.current,
    filterNotes: state.filterNotes,
    setCurrent: data => setState(data),
    setState: data => setState(data),
    setModal: ({ title, content, footer, show, close }) =>
      setModal({
        title: title,
        content: content,
        footer: footer,
        show: show,
        close: close
      }),
    setData: data =>
      setState({
        ...state,
        ...state.notes.unshift(...data.notes),
        ...state.notebooks.unshift(...data.notebooks),
        filterNotes: state.notes.filter(
          itm => itm.notebook === state.notes[0].notebook
        ),
        current: state.notes.length > 0 ? state.notes[0] : null,
        activeNotebook: state.notes.length > 0 ? state.notes[0].notebook : null
      })
  };

  return (
    <Context.Provider value={store}>
      <Modal
        title={modal.title}
        footer={modal.footer}
        show={modal.show}
        close={modal.close}
      >
        {modal.content}
      </Modal>
      <Template />
    </Context.Provider>
  );
};

export default App;
