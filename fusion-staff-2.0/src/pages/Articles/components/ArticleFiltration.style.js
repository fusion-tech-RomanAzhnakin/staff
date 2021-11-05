import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

export const FiltrationGridItem = styled(Grid).attrs((props) => ({ item: true, xs: 12, md: 6, lg: 4, ...props }))``;

export default styled.div`
  .filtration {
    &__control-label {
      margin-right: 30px;
      margin-bottom: 5px;
    }

    &__filters-grid {
      max-width: 1500px;
      margin-bottom: 15px;
    }

    &__actions-box {
      margin-bottom: 10px;
    }

    &__field-label {
      margin-bottom: 5px;
    }

    &__divider {
      width: 100%;
      margin: 10px 0;
    }

    &__cta-wrapper {
      padding-right: 8px;

      ${({ theme }) => theme.respond('md', 'padding-right: 0px')};
    }
  }
`;
