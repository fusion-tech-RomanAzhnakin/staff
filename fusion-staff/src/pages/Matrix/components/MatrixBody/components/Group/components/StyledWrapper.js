import styled from 'styled-components';
import styleConstants from 'pages/Matrix/styleConstants';
import { darken, opacify } from 'polished';

export default styled.div`
  border: 1px solid #ccc;
  border-radius: 2px;
  margin-bottom: 18px;
  background-color: #F3F2F3;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .header__left-side {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .group__header {
    height: 56px;
    background: ${styleConstants.colors.groupBg};
  }

  .section:not(:last-child) {
    margin-bottom: 3px;
  }

  .section__header {
    height: 40px;
    background: ${styleConstants.colors.sectionBg};
  }

  .icon {
    color: ${opacify(-1, styleConstants.colors.section)};
    margin-right: 8px;
  }

  .header:hover .icon {
    color: ${opacify(-0.5, styleConstants.colors.section)};
  }

  .header:hover .icon-delete {
    color: ${opacify(-0.5, styleConstants.colors.alarm)};
  }

  .header:hover .icon:hover {
    color: ${opacify(0, styleConstants.colors.section)};
  }

  .header:hover .icon-delete:hover {
    color: ${opacify(0, styleConstants.colors.alarm)};
  }

  .add-btn {
    &:hover {
      background: none;
    }
  }

  .add-group-btn {
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      color: ${({ theme }) => darken(0.1, theme.colors.primary)};
      background: none;
    }
  }

  .add-section-btn {
    color: ${styleConstants.colors.section};
    &:hover {
      color: ${darken(0.1, styleConstants.colors.section)};
      background: none;
    }
  }

  .section__level-title {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 16px;
  }

  .section__level {
    width: 33.3333%;
    padding: 10px 15px;
  }

  .section__level:not(:last-child) {
    border-right: 1px solid #ccc;
  }

  .section__inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
