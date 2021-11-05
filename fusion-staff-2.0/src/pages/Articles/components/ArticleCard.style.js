import styled from 'styled-components';
import { transparentize } from 'polished';

export default styled.a`
  display: block;
  height: 100%;

  .article-card {
    height: 100%;

    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-position: center;
    background-repeat: no-repeat;

    &__header {
      padding-top: 10px;
      padding-bottom: 5px;
    }

    &__wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;

      background: ${({ theme }) => transparentize(0.30, theme.colors.primaryGray)};
    }

    &__wrapper,
    &__url,
    &__tag {
      color: ${({ theme }) => theme.colors.primary.contrastText};
    }

    &__content {
      padding-top: 5px;

      &:last-child {
        padding-bottom: 8px;
      }
    }
    
    &__description {
      font-size: ${({ theme }) => theme.font.size.sm};
    }

    &__url {
      margin: 5px 0 12px;
    }

    &__tags-box {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    &__tag {
      margin-bottom: 8px;
      margin-right: 8px;
      
      background-color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
