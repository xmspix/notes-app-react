export const newNote = (state, data) => {
  state.setState({
    ...state,
    ...state.notes.unshift(data),
    filterNotes: state.notes.filter(itm => itm.notebook === data.notebook),
    current: data
  });
};

export const removeNote = (state, data, id) => {
  state.setState({
    ...state,
    ...state.notes.splice(
      state.notes.findIndex(itm => itm._id === id),
      1
    ),
    filterNotes: state.notes.filter(
      itm => itm.notebook === state.notes[0].notebook
    ),
    current: state.notes[0],
    ...(state.activeNotebook =
      state.notes.length > 0 ? state.notes[0].notebook : null)
  });
};

export const search = (state, string) => {
  state.setState({
    ...state,
    filterNotes: string
      ? state.notes.filter(
          itm => itm.title.includes(string) || itm.content.includes(string)
        )
      : state.notes.filter(itm => itm.notebook === state.activeNotebook)
  });
};
