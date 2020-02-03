export const newNotebook = (state, data) => {
  state.setState({
    ...state,
    ...state.notebooks.unshift(data),
    activeNotebook: data.name,
    filterNotes: state.notes.filter(itm =>
      state.notebooks.length > 0
        ? itm.notebook === state.notebooks[0].name
        : null
    ),
    current: state.notes.filter(itm => itm.notebook !== data.name)[0]
  });
};

export const removeNotebook = (state, data, id) => {
  state.setState({
    ...state,
    ...state.notebooks.splice(
      state.notebooks.findIndex(itm => itm._id === id),
      1
    ),
    notes: state.notes.filter(itm => itm.notebook !== data.name),
    filterNotes: state.notes.filter(itm =>
      state.notebooks.length > 0
        ? itm.notebook === state.notebooks[0].name
        : null
    ),
    current: state.notes.filter(itm => itm.notebook !== data.name)[0],
    activeNotebook: state.notes.length > 0 ? state.notes[0].notebook : null
  });
};

export const toggleNotebook = (state, e, itm) => {
  state.setState({
    ...state,
    filterNotes: [...state.notes.filter(c => c.notebook === itm.name)],
    activeNotebook: e.currentTarget.title
  });
};
