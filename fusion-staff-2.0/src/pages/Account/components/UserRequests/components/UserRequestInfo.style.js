import { useMemo } from 'react';
import styled from 'styled-components';

import {
  REQUEST_TYPE_COLORS,
  REQUEST_TYPE_ICONS,
  REQUEST_STATUS_COLORS,
  REQUEST_STATUS_ICONS,
} from 'utils/constants';

export const useRequestTypeIcon = (type) => {
  const TypeIcon = useMemo(() => {
    return styled(REQUEST_TYPE_ICONS[type])`
      background-color: ${REQUEST_TYPE_COLORS[type]};
      color: white;
      padding: 10px;
      border-radius: 100%;
      margin-right: 20px;
  
      && {
        width: 20px;
        min-width: 20px;
        height: 20px;
      }
    `;
  }, [type]);

  return TypeIcon;
};

export const useRequestStatusIcon = (status) => {
  const StatusIcon = useMemo(() => {
    return styled(REQUEST_STATUS_ICONS[status])`
    background-color: ${REQUEST_STATUS_COLORS[status]};
    color: white;
    padding: 10px;
    border-radius: 100%;
    margin-left: 20px;

    && {
      width: 20px;
      min-width: 20px;
      height: 20px;
    }
  `;
  }, [status]);

  return StatusIcon;
};

export default styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.mainText};
  max-width: 500px;
  width: 100%;

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainText};
  }

  @media (max-width: ${({ theme }) => theme.screen.md}px) {
    max-width: 100%;
  }
`;
