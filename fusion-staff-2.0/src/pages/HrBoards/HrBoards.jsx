import React, { memo, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Url from 'urls-tool';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CandidatesBoard from './components/CandidatesBoard';
import AppliesBoard from './components/AppliesBoard';
import ModalChangeCandidate from './components/ModalChangeCandidate/ModalChangeCandidate';

import { getHrs, getCandidateColumns, getCandidates } from './store/thunks';
import { setCandidate } from './store/reducer';

const Boards = () => {
  const [selectedBoard, setSelectedBoard] = useState(0);
  const dispatch = useDispatch();

  const getInitialData = useCallback(async () => {
    const { candidate: candidateId } = Url.getParams().object;

    await Promise.all([
      dispatch(getHrs()),
      dispatch(getCandidateColumns()),
    ]);

    await dispatch(getCandidates());

    if (candidateId) {
      dispatch(setCandidate({ id: candidateId, isOpen: true }));
    }
  }, [dispatch]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const handleTabChange = (event, newValue) => {
    setSelectedBoard(newValue);
  };

  return (
    <>
      <Tabs
        value={selectedBoard}
        onChange={handleTabChange}
        indicatorColor="primary"
      >
        <Tab label="Кандидаты" />

        <Tab label="Аплаи" />
      </Tabs>

      <TabPanelHrBoards>
        {selectedBoard === 0 && (
          <CandidatesBoard />
        )}

        {selectedBoard === 1 && (
          <AppliesBoard />
        )}
      </TabPanelHrBoards>

      <ModalChangeCandidate />
    </>
  );
};

const TabPanelHrBoards = styled.div`
  height: 100%;
`;

export default memo(Boards);
