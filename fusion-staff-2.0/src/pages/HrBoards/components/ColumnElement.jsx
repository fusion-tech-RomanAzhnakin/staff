import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Container } from 'react-smooth-dnd';
import { updateCandidateDnd } from 'pages/HrBoards/store/thunks';
import CardElement from './CardElement';

const ColumnElement = (props) => {
  const { column, columns, candidates } = props;

  const dispatch = useDispatch();

  const getCardPayload = (columnId, index) => {
    return columns[columnId].candidates[index];
  };

  const onDropCard = (columnId, dropResult) => {
    if (dropResult.addedIndex !== null) {
      (async () => {
        await dispatch(updateCandidateDnd({
          column_id: columnId,
          candidate_id: dropResult.payload,
          type: 'column',
        }));
      })();
    }
  };

  return (
    <Column >
      <DropCol id={column.id}>
        <div className='card-column-header'>
          {column.title}
        </div>
        <Container
          groupName="col"
          onDrop={(e) => onDropCard(column.id, e)}
          getChildPayload={(index) => getCardPayload(column.id, index)}
        >
          {column.candidates && column.candidates.map((candidate_id) => {
            return (
              <CardElement
                key={candidate_id}
                candidate={candidates[candidate_id]}
              />
            );
          })}
        </Container>
      </DropCol>
    </Column>
  );
};

const Column = styled.div`
  color: #c4c4c4;
  max-width: 300px;
  float: left;
  margin: 2px 10px;

  .smooth-dnd-container{
    background-color: #242424;
    min-height: 50px;
    max-height: calc(100vh - 250px);
    overflow-y: scroll;
    margin-bottom: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
`;

const DropCol = styled.div`
  background-color: #242424;
  min-width: 300px;
  margin: 10px;
  max-height: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  border-top: ${({ id }) => {
    switch (id) {
      case 1:
        return '3px solid orangered';
      case 2:
        return '3px solid cyan';
      case 3:
        return '3px solid darkorange';
      case 4:
        return '3px solid yellow';
      case 5:
        return '3px solid greenyellow';
      default:
        break;
    }
  }};

  .card-column-header{
    padding: 16px;
    font-size: 18px;
    margin: auto;
    border-bottom: 1px solid;
  }

  .column-drag-handle{
    margin-right: 20px; 
  }
`;

ColumnElement.propTypes = {
  candidates: PropTypes.objectOf(PropTypes.any),
  column: PropTypes.objectOf(PropTypes.any).isRequired,
  columns: PropTypes.objectOf(PropTypes.any).isRequired,
};

ColumnElement.defaultProps = {
  candidates: null,
};

export default ColumnElement;
