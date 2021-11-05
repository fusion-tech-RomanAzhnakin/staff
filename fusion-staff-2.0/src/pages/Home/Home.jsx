import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import MainPageContent from 'ui/components/MainPageContent';
import InActivePlug from 'pages/Home/components/InActivePlug';
import UsersCards from 'pages/Home/components/UsersCards';

const Home = () => {
  const user = useSelector(({ main }) => main.user);
  const isActive = user?.status === 'active';

  if (!isActive) {
    return <InActivePlug />;
  }

  return (
    <MainPageContent>
      <Grid container>
        <Grid item md={9} sm={12} xs={12}>
          <UsersCards />
        </Grid>

        <Grid item md={3} sm={12} />
      </Grid>
    </MainPageContent>
  );
};

export default memo(Home);
