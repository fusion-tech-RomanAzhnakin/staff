import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';

const StyledDialog = styled(Dialog)`
  .projects-editor__container {
    padding: 0 24px 24px;
  }
  
  .projects-editor__wrapper,
  .projects-editor__projects {
    overflow-y: visible;
  }
`;

export default StyledDialog;
