import styled from 'styled-components';
import styleConstants from 'pages/Matrix/styleConstants';

export default styled.div`
  position: relative;

  .padding-wrapper {
    padding: 24px;
  }

  .header {
    font-weight: 600;
    color: ${styleConstants.colors.text};
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .buttons {
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .matrix-btn {
    font-size: .9em;
  }

  .icon-buttons {
    margin-top: 0;
  }

  .buttons > *:not(:last-child) {
    margin-right: 16px;
  }

  .buttons > * {
    cursor: pointer;
  }

  .skill__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }

  .skill__knowledge-selector {
    margin-right: 5px;
  }

  .skill__title {
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 18px;
    color: ${styleConstants.colors.text};
  }

  .skill__title-input {
    width: 100%;
  }

  .skill__description {
    margin-top: 32px;
    margin-bottom: 16px;
    color: ${styleConstants.colors.text};
  }

  .skill__label {
    margin-top: 16px;
    margin-bottom: 4px;
    font-size: 14px;
    color: ${styleConstants.colors.grayDark};
  }

  .skill__level-selector {
    width: 120px;
  }

  .skill__icons {
    margin-top: 0;
  }

  .skill__icons > * {
    color: ${({ theme }) => theme.colors.headerColor};
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .skill__icons > *:not(:last-child) {
    margin-right: 12px;
  }

  .skill__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 48px;
    color: ${styleConstants.colors.grayDark};
  }

  .skill__footer span {
    font-weight: 700;
    color: ${styleConstants.colors.text};
  }

  .skill__line {
    height: 4px;
    height: ${({ level }) => (level ? '4px' : 0)};
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;

    background: ${({ level }) => {
    switch (level) {
      case 'high':
        return styleConstants.gradients.high;
      case 'low':
        return styleConstants.gradients.low;
      default:
        return null;
    }
  }};
  }

  .skill__comment-blank {
    margin-bottom: 32px;
    color: ${styleConstants.colors.text};
  }

  .skill__comment-input {
    width: 100%;
  }

  .skill__comment {
    background-color: ${styleConstants.colors.grayLighten};
    border-radius: 4px;
    font-size: 14px;
    padding: 12px 16px;
    margin-bottom: 2px;
    word-break: break-word;
    white-space: pre;
  }

  .skill__comment-description {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
    font-size: 12px;
    margin-top: 4px;
    margin-bottom: 12px;
    color: ${styleConstants.colors.grayDark};
  }

  .skill__comment-avatar {
    width: 16px;
    height: 16px;
    border-radius: 8px;
    margin-right: 6px;
  }

  .section-btn {
    position: absolute;
    top: 2px;
    right:9px;
  }

  .section__level {
    width: 33.3333%;
    border-right: ${(props) => (props.last ? 'none' : '1px solid #ccc')};
    padding: 10px 15px;
  }

  .section__skill {
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: ${styleConstants.shadows.main};
    &:hover {
      box-shadow: ${styleConstants.shadows.main}, ${styleConstants.shadows.hover};
    }
  }

  .section__inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  /* React Quill */
  .ql-toolbar {
    background: ${styleConstants.colors.grayLighten};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .ql-container {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 16px;
  }

  .ql-editor {
    min-height: 10em;
  }
`;
