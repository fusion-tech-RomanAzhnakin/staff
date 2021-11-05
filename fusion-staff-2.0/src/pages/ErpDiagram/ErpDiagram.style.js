import styled from 'styled-components';

import MainPageContent from 'ui/components/MainPageContent';

export default styled(MainPageContent)`
  z-index: 1;
  color: ${({ theme }) => theme.colors.primary.mainText};

  && * {
    color: inherit;
  }

  .react-calendar-timeline  {
    border: 1px solid #bbb;
    border-bottom: none;
  }

  .rct-header-root {
    background-color: transparent;
  }

  .rct-header-root > *:first-child {
    border-right: 1px solid #bbb;
  }

  .rct-calendar-header {
    border: none;
  }

  .rct-dateHeader  {
    background-color: transparent;
  }

  && .rct-vl-first {
    border-left-style: dashed;
  }

  /* .react-calendar-timeline .rct-dateHeader-primary {
    border-right: none;
    border-left: none;
  } */

  &&& .rct-day-6,
  &&& .rct-day-0 {
    background-color: ${({ theme }) => theme.colors.erp.holiday};
  }
`;
