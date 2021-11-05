import styled from 'styled-components';
import transparentize from 'polished/lib/color/transparentize';

export default styled.div`
  background-color: ${({ backgroundColor, theme }) => transparentize(0.3, backgroundColor || theme.colors.primary.main)};
  color: ${({ theme }) => theme.colors.primary.mainText};
  padding: 0 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .pm-avatar {
    margin-right: 10px;
  }
  
  .item-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    :first-letter {
      text-transform: uppercase;
    }
  }
`;
