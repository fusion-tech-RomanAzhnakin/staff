import styled from 'styled-components';

import Card from '@material-ui/core/Card';

export default styled(Card)`
  && {
    display: flex;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;
    overflow: visible;
    cursor: pointer;
  }

  .user-card__content {
    overflow: hidden;
    min-width: unset;
    flex-grow: 1;
  };
`;
