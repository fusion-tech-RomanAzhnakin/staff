import React, { memo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Container } from 'react-smooth-dnd';
import { withUser } from 'store/connections';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getFullName } from 'utils/utils';
import Avatar from 'ui/components/Avatar';
import { UserType } from 'utils/types';
import { updateCandidateDnd } from 'pages/HrBoards/store/thunks';
import { setCandidate } from 'pages/HrBoards/store/reducer';
import CardElement from './CardElement';
import { columnSkeleton } from './columnSkeleton';

const AppliesBoard = (props) => {
  const {
    hrs,
    candidates,
    user,
  } = props;

  const dispatch = useDispatch();

  const getCardPayload = (columnId, index) => {
    return hrs[columnId].candidates[index];
  };

  const onDropCard = (columnId, dropResult) => {
    if (dropResult.addedIndex !== null) {
      (async () => {
        await dispatch(updateCandidateDnd({
          column_id: columnId,
          candidate_id: dropResult.payload,
          type: 'hr',
        }));
      })();
    }
  };

  return (
    <AppliesContainer orientation="horizontal">
      {hrs ? Object.keys(hrs).sort((a, b) => { if (a === 'null') { return -1; } return (+a - +b); }).map((hrKey) => {
        return (
          <AppliesColumnElement key={hrKey === 'null' ? 0 : hrKey}>
            <DropCol id={hrKey}>
              <div className='card-column-header'>
                <div> {hrKey !== 'null' ? getFullName(hrs[hrKey], 'full') : 'Необработанные'}</div>
                {hrKey !== 'null'
                  ? <div className='avatar_block'>
                    <Avatar
                      user={hrs[hrKey]}
                    />
                  </div>
                  : ''}
              </div>
              <Container
                {...hrs[hrKey].props}
                groupName="col"
                onDrop={(e) => onDropCard(hrs[hrKey].id, e)}
                getChildPayload={(index) => getCardPayload(hrs[hrKey].id, index)}
              >
                {Object.keys(candidates).map((candidateKey) => (
                  !candidates[candidateKey].column_id &&
                  candidates[candidateKey].hr_id === hrs[hrKey].id &&
                  <CardElement
                    key={candidates[candidateKey].id}
                    candidate={candidates[candidateKey]}
                  />
                ))}

              </Container>
              {(user.firstName === hrs[hrKey].firstName || hrKey === 'null') &&
                <AddNewTask
                  onClick={() => { dispatch(setCandidate({ id: 0, isOpen: true })); }}
                >
                  + Добавить аплай
                </AddNewTask>
              }
            </DropCol>
          </AppliesColumnElement>
        );
      }) : columnSkeleton}
    </AppliesContainer>
  );
};

const AppliesContainer = styled.div`
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

const AppliesColumnElement = styled.div`
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
  border-top: 3px solid greenyellow;
  border-top: ${({ id }) => id === 'null' && '3px solid cyan'};
  .card-column-header{
    padding: 16px;
    font-size: 18px;
    margin: auto;
    border-bottom: 1px solid;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .avatar_block{
      width: 40px;
      height: 40px;
      .avatar{
        width: 35px;
        height: 35px;
        background-color: gray;
        border-radius: 50%;
        margin: auto 0 auto auto;
      }
    }
  }
  .column-drag-handle{
    margin-right: 20px; 
  }
`;

const AddNewTask = styled.div`
  margin-bottom: 0;
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 10px;
  text-align: center;
  :hover{
    cursor: pointer;
    background-color: #2b2b2b;
  }
`;

AppliesBoard.propTypes = {
  hrs: PropTypes.objectOf(PropTypes.any),
  candidates: PropTypes.objectOf(PropTypes.any),
  user: UserType.isRequired,
};

AppliesBoard.defaultProps = {
  candidates: null,
  hrs: null,
};

const mapStateToProps = (store) => ({
  hrs: store.hrBoards.hrs,
  candidates: store.hrBoards.candidates,
});

export default connect(mapStateToProps, null)(withUser(memo(AppliesBoard)));
