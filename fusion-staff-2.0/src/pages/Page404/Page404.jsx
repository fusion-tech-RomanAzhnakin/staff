import React, { memo } from 'react';

import Typography from '@material-ui/core/Typography';
import StyledPage from 'pages/Page404/Page404.style';

const Page404 = () => (
  <StyledPage>
    <Typography variant="h1">
      404
    </Typography>

    <Typography variant="h3">
      Страница не найдена
    </Typography>
  </StyledPage>
);

export default memo(Page404);
