import { createSlice } from '@reduxjs/toolkit';

export const getInitialStore = () => ({
  hrs: null,
  candidates: null,
  columns: null,
  openCandidate: { id: null, modalIsOpen: false, messages: [] },
  socket: null,
});

const hrBoardsSlice = createSlice({
  name: 'hrBoards',
  initialState: getInitialStore(),
  reducers: {
    updateHrs: (store, { payload }) => ({
      ...store,
      hrs: payload,
    }),
    updateOneHr: (store, { payload }) => ({
      ...store,
      hrs: { ...store.hrs, [payload.id]: payload },
    }),
    updateCandidates: (store, { payload }) => ({
      ...store,
      candidates: payload,
    }),
    updateOneCandidate: (store, { payload }) => (
      {
        ...store,
        candidates: { ...store.candidates, [payload.id]: payload },
      }),
    updateOneColumn: (store, { payload }) => ({
      ...store,
      columns: { ...store.columns, [payload.id]: payload },
    }),
    updateColumns: (store, { payload }) => ({
      ...store,
      columns: payload,
    }),
    setCandidate: (store, { payload }) => ({
      ...store,
      openCandidate: { id: payload.id, modalIsOpen: payload.isOpen, messages: [] },
    }),
    setSocket: (store, { payload }) => ({
      ...store,
      socket: payload,
    }),
    setMessages: (store, { payload }) => ({
      ...store,
      openCandidate:
      {
        ...store.openCandidate,
        messages: store.openCandidate.messages.concat(payload),
      },
    }),
    updateSubscribers: (store, { payload }) => ({
      ...store,
      candidates: {
        ...store.candidates,
        [payload.id]: {
          ...store.candidates[payload.id],
          subscribers: payload.data,
        },
      },

    }),
  },
});

export const {
  updateHrs,
  updateOneHr,
  updateCandidates,
  updateOneCandidate,
  updateColumns,
  updateOneColumn,
  setCandidate,
  setCandidatesInColumns,
  setSocket,
  setMessages,
  updateSubscribers,
} = hrBoardsSlice.actions;

export default hrBoardsSlice.reducer;
