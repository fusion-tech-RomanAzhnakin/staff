import React from 'react';
import StaffList from 'pages/Staff/components/StaffList';
import StaffFilter from 'pages/Staff/components/StaffFilter';

import StyledPage from 'pages/Staff/Staff.style';

const Staff = () => {
  return (
    <StyledPage>
      <StaffFilter />
      <StaffList />
    </StyledPage>
  );
};

export default Staff;
