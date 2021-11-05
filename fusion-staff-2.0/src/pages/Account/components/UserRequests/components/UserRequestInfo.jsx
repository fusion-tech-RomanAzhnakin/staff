import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import format from 'date-fns/format';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import StyledRequest, { useRequestTypeIcon, useRequestStatusIcon } from 'pages/Account/components/UserRequests/components/UserRequestInfo.style';

import requestsApi from 'api/requestsApi';
import { toggleLoader } from 'store/main/reducer';
import { RequestType } from 'utils/types';
import {
  REQUEST_TYPES_NAMES,
  REQUEST_STATUS_NAMES,
  defaultErrorMessage,
} from 'utils/constants';

const UserRequestInfo = ({ request, getList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    id,
    type,
    status,
    title,
    dateFrom,
    dateTo,
    comment,
    deniedComment,
    updated_by,
  } = request;

  const getMoreRequestInfo = () => {
    setIsOpen(!isOpen);
  };

  const cancelRequest = async () => {
    const data = {
      id,
      status: 'denied',
      deniedComment: 'Отменено пользователем',
    };
    try {
      toggleLoader(true);

      await requestsApi.edit(data);
      setIsOpen(false);
      await getList();
      toast.success('Заявка успешно изменена');
    } catch (error) {
      toast.error(defaultErrorMessage);
    } finally {
      toggleLoader(false);
    }
  };

  const typeName = REQUEST_TYPES_NAMES[type];
  const statusName = REQUEST_STATUS_NAMES[status];

  const TypeIcon = useRequestTypeIcon(type);

  const StatusIcon = useRequestStatusIcon(status);

  return (
    <StyledRequest>
      <StyledListItem button onClick={getMoreRequestInfo}>
        <Tooltip title={typeName}>
          <TypeIcon />
        </Tooltip>

        <p> {title} </p>
        <div className="request-icons">
          <Tooltip title={statusName}>
            <StatusIcon />
          </Tooltip>

          <span> {isOpen ? <ExpandLess /> : <ExpandMore />}</span>
        </div>
      </StyledListItem>

      <Collapse in={isOpen}>
        <StyledRequestBody>
          <StyledRequestDates>
            <p>Когда:</p>
            {dateFrom && dateTo ? (
              <>
                <p>c {format(new Date(dateFrom), 'dd.MM.yyyy')} </p>
                <p>по {format(new Date(dateTo), 'dd.MM.yyyy')} </p>
              </>
            ) : (
              <>
                {dateFrom && <p>{format(new Date(dateFrom), 'dd.MM.yyyy')} </p>}
                {dateTo && <p> {format(new Date(dateTo), 'dd.MM.yyyy')} </p>}
              </>
            )}
          </StyledRequestDates>

          <StyledRequestDetails>
            {comment && <p>Комментарий: {comment} </p>}
            {deniedComment && <p>Причина отказа: {deniedComment} </p>}
            {updated_by && <p>Вынес решение: {updated_by}</p>}
          </StyledRequestDetails>

          <StyledRequestStatus>
            {status && <div>Статус : {statusName}</div>}
            {status === 'wait' && (
              <Button className="decline-btn" onClick={() => cancelRequest()}>
                Отменить
              </Button>
            )}
          </StyledRequestStatus>
        </StyledRequestBody>
      </Collapse>
    </StyledRequest>
  );
};

const StyledRequestBody = styled.div`
  padding-left: 15px;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const StyledListItem = styled(ListItem)`
  && {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .request-icons {
      display: flex;
      align-items: center;
    }
  }
`;

const StyledRequestDates = styled.div``;

const StyledRequestDetails = styled.div`
  padding-top: 10px;
  p:last-of-type {
    padding-top: 10px;
  }
`;

const StyledRequestStatus = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

UserRequestInfo.propTypes = {
  request: RequestType.isRequired,
  getList: PropTypes.func,
};

UserRequestInfo.defaultProps = {
  getList: () => null,
};

export default UserRequestInfo;
