import React, { memo, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getCandidateColumns } from 'pages/HrBoards/store/thunks';

import ColumnElement from './ColumnElement';

const CandidatesBoard = (props) => {
  const {
    columns,
    candidates,
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!columns) {
      dispatch(getCandidateColumns());
    }
  }, [columns, dispatch]);

  return (
    <CustomContainer>
      {columns && Object.keys(columns).map((oneKey) => {
        return (
          <ColumnElement
            key={columns[oneKey].id}
            column={columns[oneKey]}
            columns={columns}
            candidates={candidates}
          />
        );
      })}
    </CustomContainer>
  );
};

const CustomContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  padding-right: 20px;
  height: 100%;
  .smooth-dnd-container{
    background-color: #242424;
    min-height: 50px;
    border-radius: 10px;
    overflow-y: scroll;
    max-height: calc(100vh - 200px);
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
`;

CandidatesBoard.propTypes = {
  columns: PropTypes.objectOf(PropTypes.any),
  candidates: PropTypes.objectOf(PropTypes.any),
};

CandidatesBoard.defaultProps = {
  columns: null,
  candidates: null,
};

const mapStateToProps = (store) => ({
  columns: store.hrBoards.columns,
  candidates: store.hrBoards.candidates,
});

export default connect(mapStateToProps, null)(memo(CandidatesBoard));
