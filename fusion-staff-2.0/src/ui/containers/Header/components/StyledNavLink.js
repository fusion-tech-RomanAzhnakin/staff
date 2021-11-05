import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

export default styled(NavLink)`
  &.current-link {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
