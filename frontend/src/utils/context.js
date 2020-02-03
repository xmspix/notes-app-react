import React from "react";

export default React.createContext({
  notebooks: null,
  notes: null,
  corrent: null,
  filterNotes: null,
  getCurrent: () => {},
  setState: () => {},
  setModal: () => {}
});
