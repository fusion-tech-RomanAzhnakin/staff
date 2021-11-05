import React, { createRef, useEffect } from 'react';
import { Draggable } from 'react-smooth-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getFullName } from 'utils/utils';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import { AvatarGroup } from '@material-ui/lab';
import Avatar from 'ui/components/Avatar';
import { setCandidate } from 'pages/HrBoards/store/reducer';

const CardElement = (props) => {
  const {
    candidate,
  } = props;
  const column = useSelector(({ hrBoards }) => hrBoards.hrs[candidate.hr_id]);
  const usersList = useSelector(({ enums }) => enums.usersList);
  const ref = createRef();
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setCandidate({ id: candidate.id, isOpen: true }));
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [ref]);

  return (
    <AppliesBoardElement
      onDoubleClick={openModal}
    >
      <div {...candidate.props}>
        <div className='aplyCardHeader'>
          <h3>{getFullName(candidate, 'full')}</h3>
          <span className='editBtn'>
            <Tooltip title="Изменить">
              <IconButton
                aria-label="edit"
                onClick={openModal}
              >
                <CreateIcon />
              </IconButton>
            </Tooltip>
          </span>
        </div>
        <p>{moment(candidate.createdAt).format('ll')}</p>
        <div className='technology_block'>
          {candidate.technologies.map((t) => {
            return <Chip key={t.id} label={`${t.title}`} color="primary" size="small" />;
          })}
        </div>
      </div>
      <AvatarGroup className='sm' max={2}>
        {candidate.subscribers.map((value) => <Avatar className='sm'
          size='sm'
          key={value.id}
          user={usersList[value.id]}
        />)
        }
      </AvatarGroup>
      <div className='avatar_block'>
        {column && column.id && candidate.hr_id
          ? <Avatar user={column} />
          : ''
        }
      </div>
      <span ref={ref} />
    </AppliesBoardElement>
  );
};

const AppliesBoardElement = styled(Draggable)`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 100px;
  background-color: #3a3a3a;
  margin: 15px;
  border-radius: 10px;

  div {
    padding: 5px;
  }

  h3 {
    font-size: 18px;
    height: 20px;
  }
  p {
    font-size: 14px;
    height: 20px;
    padding: 5px;
  }
  .MuiAvatarGroup-avatar{
    border: none;
    width: 20px;
      height: 20px;
      font-size: 14px;
  }
  .avatar_block{
    display: flex;
    justify-content: flex-end;
    .MuiAvatar-circle{
      width: 20px;
      height: 20px;
      margin: 1px 0 1px auto;
    }
  }
  
  .aplyCardHeader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 15px;
    span{
      visibility: hidden;
      max-height: 8px;
      max-width: 8px;
    }
  }
  .technology_block{
    max-width: 180px;
    height: auto;
    .MuiChip-root{
      padding: 2px 5px;
      min-width: 40px;
      margin: 2px;
    }
  }
  :hover {
    span {
      visibility: visible;
    }
  }
`;

CardElement.propTypes = {
  candidate: PropTypes.objectOf(PropTypes.any).isRequired,
  column: PropTypes.objectOf(PropTypes.any),
};

CardElement.defaultProps = {
  column: PropTypes.undefined,
};

export default CardElement;
