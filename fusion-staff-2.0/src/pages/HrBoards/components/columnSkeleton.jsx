/* eslint-disable react/forbid-component-props */
import React from 'react';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';

const MyCard = styled(Card)`
  background: #242424;
  max-height: 300px;
  margin-left: 30px;
  margin: 20px;
`;

export const columnSkeleton = (
  <MyCard>
    <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6, float: 'right' }} />
    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6, float: 'left' }} />
    <Skeleton animation="wave" variant="circle" width={40} height={40} style={{ margin: 'auto' }} />
    <Skeleton variant="rect" width={270} height={220} animation="wave" style={{ margin: 10 }} />
  </MyCard>
);
