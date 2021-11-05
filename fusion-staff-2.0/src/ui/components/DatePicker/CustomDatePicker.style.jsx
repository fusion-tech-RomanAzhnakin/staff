import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  font-size: 12px;

  * {
    font-size: inherit;
  }

  .rdrDefinedRangesWrapper,
  .rdrDateDisplayWrapper {
    display: none;
  };

  .rdrDateRangePickerWrapper {
    display: flex;
    width: 100%;
  }

  .rdrMonthAndYearWrapper {
    display: flex;
  }

  .rdrCalendarWrapper {
    display: flex;
    background-color: #555555;
    border-radius: 4px;
    width: 100%;
    align-items: center;
    padding-bottom: 10px;
  }

  .rdrDateRangeWrapper {
    display: flex;
    background-color: #555555;
    border-radius: 4px;
    align-items: center;
  }

  .rdrMonths {
    display: flex;
    justify-content: start;
    align-items: start;
  }

  .rdrMonth {
    padding: 0;
  }

  .rdrMonthAndYearPickers select {
    color: ${({ theme }) => theme.colors.mainText};
    appearance: button;
    background: transparent;
  }

  .rdrNextPrevButton {
    background: transparent;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main}
    }
  }

  .rdrPprevButton i {
    border-color: transparent;
    border-right-color: ${({ theme }) => theme.colors.mainText};
  }

  .rdrNextButton i {
    border-color: transparent;
    border-left-color: ${({ theme }) => theme.colors.mainText};
  }

  .rdrDay span {
    color: ${({ theme }) => theme.colors.mainText};
  }

  .rdrDayDisabled {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.mainText};
    opacity: 0.1;
  }

  .rdrDayPassive{
    pointer-events: auto;
    
    span {
      color: ${({ theme }) => theme.colors.mainText};
    }
  }

  .rdrDayToday .rdrDayNumber span::after {
    background-color: ${({ theme }) => theme.colors.primary.main};
  }

  .rdrSelected,
  .rdrInRange,
  .rdrStartEdge,
  .rdrEndEdge {
    color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.primary.main};
  }

  .rdrDayStartPreview, .rdrDayInPreview, .rdrDayEndPreview {
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
  }

  @media (max-width: 425px) {
    font-size: 3vw;
  }
`;
