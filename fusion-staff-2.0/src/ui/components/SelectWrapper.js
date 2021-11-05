import styled from 'styled-components';

// You need to add classNamePrefix="select" to apply this styles
export default styled.div`
  .select {
    &__control {
      box-shadow: none;
      border-radius: 0;
      transition: none;

      color: ${({ theme }) => theme.colors.mainText};
      border: 1px solid ${({ theme }) => theme.colors.gray.main};
      background-color: transparent;

      &--is-focused {
        border-color: ${({ theme }) => theme.colors.gray.light} !important;
      }

      &--menu-is-open {
        border-color: ${({ theme }) => theme.colors.primary.main} !important;
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.primary.main};
      }
    }

    &__single-value {
      color: ${({ theme }) => theme.colors.mainText};
    }

    &__input {
      color: ${({ theme }) => theme.colors.mainText};
    }

    &__indicator-separator {
      border-color: ${({ theme }) => theme.colors.gray.light};
    }

    &__indicator,
    &__clear-indicator {
      svg {
        fill: ${({ theme }) => theme.colors.gray.light};
        cursor: pointer;
      }
    }

    &__menu {
      background-color: ${({ theme }) => theme.colors.pageBackground};
      color: ${({ theme }) => theme.colors.mainText};
    }

    &__menu-notice--no-options {
      background-color: ${({ theme }) => theme.colors.pageBackground};
      color: ${({ theme }) => theme.colors.mainText};
    }

    &__option {
      &:active {
        background-color: ${({ theme }) => theme.colors.primary.dark};
      }

      &--is-focused {
        color: ${({ theme }) => theme.colors.primary.contrastText};
        background-color: ${({ theme }) => theme.colors.primary.main};
      }

      &--is-selected {
        color: ${({ theme }) => theme.colors.primary.contrastText};
        background-color: ${({ theme }) => theme.colors.primary.light};;
      }
    }

    &__multi-value {
      color: ${({ theme }) => theme.colors.primary.contrastText};
      background-color: ${({ theme }) => theme.colors.primary.main};
      border-radius: 0;
      
      &__label {
        font-size: ${({ theme }) => theme.font.size.sm};
        color: inherit;
      }

      &__remove {
        cursor: pointer;
        border-radius: 0;

        :hover {
          color: ${({ theme }) => theme.colors.primary.contrastText};
          background-color: ${({ theme }) => theme.colors.primary.light};
        }

        :active {
          background-color: ${({ theme }) => theme.colors.primary.dark};
        }
      }
    }
  }
`;
