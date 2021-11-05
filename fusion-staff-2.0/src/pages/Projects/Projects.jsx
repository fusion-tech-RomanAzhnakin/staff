import React from 'react';
import ProjectsList from 'pages/Projects/components/ProjectsList';
import ProjectsFilter from 'pages/Projects/components/ProjectsFilter';

import StyledPage from 'pages/Projects/Wrapper.style';

const Staff = () => {
  return (
    <StyledPage>
      <ProjectsFilter />
      <ProjectsList />
    </StyledPage>
  );
};

export default Staff;
