import { createAsyncThunk } from '@reduxjs/toolkit';
import _cloneDeep from 'lodash/cloneDeep';

import hrBoardsApi from 'api/hrBoardsApi';
import candidateApi from 'api/candidateApi';
import userApi from 'api/userApi';
import messagesApi from 'api/messagesApi';
import subscribersApi from 'api/subscribersApi';

import {
  updateHrs,
  updateCandidates,
  updateColumns,
  updateOneCandidate,
  updateOneColumn,
  updateOneHr,
  setMessages,
} from './reducer';

export const getCandidateColumns = createAsyncThunk(
  'hrBoards/getCandidateColumns',
  async (arg, { dispatch }) => {
    try {
      const data = await hrBoardsApi.getColumns();
      const columns = {};
      data.data.forEach((col) => {
        columns[col.id] = { ...col, candidates: [] };
      });
      dispatch(updateColumns(columns));
    } catch (err) {
      dispatch(updateColumns(null));
    }
  },
);

export const getCandidates = createAsyncThunk(
  'hrBoards/getCandidates',
  async (arg, { dispatch, getState }) => {
    try {
      const { columns: storeColumns, hrs: storeHrs } = getState().hrBoards;
      const columns = _cloneDeep(storeColumns);
      const hrs = _cloneDeep(storeHrs);
      const { data } = await candidateApi.getAll();
      const candidates = {};
      data.forEach((cand) => {
        candidates[cand.id] = cand;
        if (cand.column_id) {
          columns[cand.column_id].candidates.push(cand.id);
        }
        if (!cand.column_id) {
          hrs[cand.hr_id].candidates.push(cand.id);
        }
      });
      dispatch(updateCandidates(candidates));
      dispatch(updateColumns(columns));
      dispatch(updateHrs(hrs));
    } catch (err) {
      dispatch(updateCandidates(null));
    }
  },
);

export const updateCandidate = createAsyncThunk(
  'hrBoards/updateCandidate',
  async (arg, { dispatch }) => {
    try {
      const { state, candidate_id } = arg;

      const { data } = await candidateApi.update(
        candidate_id,
        state,
      );

      dispatch(updateOneCandidate(data));
    } catch (err) {
      dispatch(updateCandidates(null));
    }
  },
);

/**
 * @param {{
    candidateId: number;
    parentObject: object;
 * }} options
 */
const deleteFromColumn = ({
  candidateId,
  parentObject,
}) => {
  const candidateIndex = parentObject.candidates.indexOf(candidateId);
  parentObject.candidates.splice(candidateIndex, 1);
  parentObject.candidates.sort();
  return { parentObject };
};

export const sendToArchive = createAsyncThunk(
  'hrBoards/sendToArchive',
  async (arg, { dispatch, getState }) => {
    try {
      const { candidate_id } = arg;

      const {
        candidates: storeCandidates,
        hrs: storeHrs,
        columns: storeColumns,
      } = getState().hrBoards;
      const candidates = _cloneDeep(storeCandidates);
      const hrs = _cloneDeep(storeHrs);
      const columns = _cloneDeep(storeColumns);

      const isSuccess = await candidateApi.deleteOne(
        candidate_id,
      )
        .then(() => true)
        .catch(() => false);
      if (isSuccess) {
        if (candidates[candidate_id].column_id) {
          deleteFromColumn({
            candidateId: candidate_id,
            parentObject: columns[candidates[candidate_id].column_id],
          });

          dispatch(updateColumns(columns));
        }
        if (candidates[candidate_id].hr_id) {
          deleteFromColumn({
            candidateId: candidate_id,
            parentObject: hrs[candidates[candidate_id].hr_id],
          });

          dispatch(updateHrs(hrs));
        }
        delete candidates[candidate_id];
        dispatch(updateCandidates(candidates));
      }
    } catch (err) {
      dispatch(updateCandidates(null));
    }
  },
);

/**
 * @param {{
    columnId: number;
    candidateId: number;
    candidates: object;
    parentObject: object;
    type: "hr" | "column"
 * }} options
 */
const dndHandler = ({
  columnId,
  candidateId,
  candidates,
  parentObject,
  type,
}) => {
  let oldColumn_id;
  const newCandidates = candidates;
  if (type === 'column') {
    oldColumn_id = candidates[candidateId].column_id;
    newCandidates[candidateId].column_id = columnId;
  } else {
    oldColumn_id = candidates[candidateId].hr_id;
    newCandidates[candidateId].hr_id = columnId;
  }

  const candidateIndex = parentObject[oldColumn_id].candidates.indexOf(candidateId);
  parentObject[oldColumn_id].candidates.splice(candidateIndex, 1);
  parentObject[columnId].candidates.push(candidateId);
  parentObject[columnId].candidates.sort();
  const newParentObject = parentObject;
  return { newCandidates, newParentObject };
};

export const updateCandidateDnd = createAsyncThunk(
  'hrBoards/updateCandidate',
  async (arg, { dispatch, getState }) => {
    try {
      const {
        hrs: storeHrs,
        columns: storeColumns,
        candidates: storeCandidates,
      } = getState().hrBoards;

      const { column_id: columnId, candidate_id: candidateId, type } = arg;
      const parentObject = type === 'column' ? _cloneDeep(storeColumns) : _cloneDeep(storeHrs);

      const candidates = _cloneDeep(storeCandidates);

      const { newCandidates, newParentObject } = dndHandler({
        columnId,
        candidateId,
        candidates,
        parentObject,
        type,
      });
      const data = {};
      dispatch(updateCandidates(newCandidates));
      if (type === 'column') {
        data.column_id = columnId;
        dispatch(updateColumns(newParentObject));
      } else {
        data.hr_id = columnId;
        dispatch(updateHrs(newParentObject));
      }
      const isSuccess = await candidateApi.update(
        candidateId,
        data,
      )
        .then(() => true)
        .catch(() => false);

      if (isSuccess) {
        return;
      }
      dispatch(updateCandidates(storeCandidates));
      if (type === 'column') {
        dispatch(updateColumns(storeColumns));
      } else {
        dispatch(updateHrs(storeHrs));
      }
    } catch (err) {
      dispatch(updateCandidates(null));
    }
  },
);

export const setNewColumn = createAsyncThunk(
  'hrBoards/updateCandidate',
  async (arg, { dispatch, getState }) => {
    try {
      const { column_id, candidate_id } = arg;
      const {
        hrs: storeHrs,
        columns: storeColumns,
        candidates: storeCandidates,
      } = getState().hrBoards;
      const data = { column_id };
      const candidates = _cloneDeep(storeCandidates);
      const column = _cloneDeep(storeColumns[column_id]);
      const hrs = _cloneDeep(storeHrs);
      const currentCandidate = candidates[candidate_id];

      const candidateIndex = hrs[currentCandidate.hr_id].candidates.indexOf(candidate_id);
      hrs[currentCandidate.hr_id].candidates.splice(candidateIndex, 1);
      hrs[currentCandidate.hr_id].candidates.sort();
      currentCandidate.column_id = column_id;
      column.candidates.push(candidate_id);

      const isSuccess = await candidateApi.update(
        arg.candidate_id,
        data,
      )
        .then(() => true)
        .catch(() => false);
      if (isSuccess) {
        dispatch(updateOneColumn(column));
        dispatch(updateHrs(hrs));
        dispatch(updateOneCandidate(currentCandidate));
      }
    } catch (err) {
      dispatch(updateCandidates(null));
    }
  },
);

export const createCandidate = createAsyncThunk(
  'hrBoards/createCandidate',
  async (arg, { dispatch, getState }) => {
    try {
      const { state } = arg;
      const { data } = await candidateApi.create(state);
      const {
        hrs: storeHrs,
      } = getState().hrBoards;
      const hrs = _cloneDeep(storeHrs);
      const currentHr = hrs.null;
      currentHr.candidates.push(data.id);
      await dispatch(updateOneCandidate(data));
      await dispatch(updateOneHr(currentHr));
    } catch (err) {
      dispatch(updateCandidates(null));
    }
  },
);

export const getHrs = createAsyncThunk(
  'hrBoards/getHrs',
  async (arg, { dispatch }) => {
    try {
      const data = await userApi.getList({ filter: { role: 'hr' } });
      const hrs = {};

      // for storing unhandlling applyes
      hrs.null = { id: null, candidates: [] };

      data.data.forEach((hr) => {
        hrs[hr.id] = { ...hr, candidates: [] };
      });
      await dispatch(updateHrs(hrs));
    } catch (err) {
      dispatch(updateHrs(null));
    }
  },
);

export const getAllMessages = createAsyncThunk(
  'hrBoards/getAllMessages',
  async (arg, { dispatch }) => {
    try {
      const { candidate_id } = arg;

      const { data } = await messagesApi.getAll(candidate_id);
      dispatch(setMessages(data));
    } catch (err) {
      dispatch(updateCandidates(null));
    }
  },
);

export const updateCandidateSubscribers = createAsyncThunk(
  'hrBoards/updateCandidateSubscribers',
  async (arg, { dispatch }) => {
    try {
      const { candidate, candidate_id, user_id } = arg;
      const data = await subscribersApi.update(
        candidate_id,
        { user_id },
      );
      await dispatch(updateOneCandidate({ ...candidate, subscribers: data }));
    } catch (err) {
      dispatch(updateCandidates(null));
    }
  },
);
