import { css } from 'styled-components';

export default css`
  .react-calendar-timeline * {
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .react-calendar-timeline .rct-outer {
    display: block;
    overflow: hidden;
    white-space: nowrap;
  }
  .react-calendar-timeline .rct-scroll {
    display: inline-block;
    white-space: normal;
    vertical-align: top;
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-touch-action: none;
    touch-action: none;
  }
  .react-calendar-timeline .rct-item:hover {
    z-index: 88;
  }
  .react-calendar-timeline .rct-item .rct-item-content {
    position: sticky;
    position: -webkit-sticky;
    left: 0px;
    overflow: hidden;
    display: inline-block;
    border-radius: 2px;
    padding: 0 6px;
    height: 100%;
  }
  .react-calendar-timeline .rct-sidebar {
    overflow: hidden;
    white-space: normal;
    display: inline-block;
    vertical-align: top;
    position: relative;
    box-sizing: border-box;
    border-right: 1px solid #bbb;
  }
  .rct-sidebar div:last-child {
    border-bottom-left-radius: 25px;
  }

  .rct-sidebar div:nth-child(-n + 3) {
    border-left: 1px solid #bbb;
  }
  .react-calendar-timeline .rct-sidebar.rct-sidebar-right {
    border-right: 0;
    border-left: 1px solid #bbb;
  }
  .react-calendar-timeline .rct-sidebar .rct-sidebar-row {
    padding: 0 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: content-box;
    margin: 0;
    border-bottom: 1px solid #bbb;
  }
  .react-calendar-timeline .rct-sidebar .rct-sidebar-row.rct-sidebar-row-odd {
    background: rgba(0, 0, 0, 0.05);
  }
  .react-calendar-timeline .rct-sidebar .rct-sidebar-row.rct-sidebar-row-even {
    background: transparent;
  }
  .react-calendar-timeline .rct-vertical-lines .rct-vl {
    position: absolute;
    border-left: 1px solid #bbb;
    z-index: 30;
  }
  .react-calendar-timeline .rct-vertical-lines .rct-vl.rct-vl-first {
    border-left-width: 1px;
  }
  .react-calendar-timeline .rct-vertical-lines .rct-vl.rct-day-6,
  .react-calendar-timeline .rct-vertical-lines .rct-vl.rct-day-0 {
    background: rgba(254, 240, 246, 0.7);
    border-bottom: 1px solid #bbb;
  }
  .react-calendar-timeline .rct-horizontal-lines .rct-hl-even,
  .react-calendar-timeline .rct-horizontal-lines .rct-hl-odd {
    border-bottom: 1px solid #bbb;
    box-sizing: content-box;
    z-index: 40;
  }
  .react-calendar-timeline .rct-horizontal-lines .rct-hl-odd {
    background: rgba(0, 0, 0, 0.05);
  }
  .react-calendar-timeline .rct-horizontal-lines .rct-hl-even {
    background: transparent;
  }
  .react-calendar-timeline .rct-cursor-line {
    position: absolute;
    width: 2px;
    background: #2196f3;
    z-index: 51;
  }
  .react-calendar-timeline .rct-infolabel {
    position: fixed;
    left: 100px;
    bottom: 50px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    font-size: 20px;
    border-radius: 5px;
    z-index: 85;
  }
  .react-calendar-timeline .rct-dateHeader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-bottom: 1px solid #bbb;
    cursor: pointer;
    font-size: 14px;
    background-color: #ffffff;
    border-left: 1px solid #bbb;
  }
  .react-calendar-timeline .rct-dateHeader-primary {
    background-color: initial;
    border-left: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    color: black;
  }
  .react-calendar-timeline .rct-header-root {
    background: rgba(33, 150, 243, 0.5);
    border-top-left-radius: 25px;
  }
  .react-calendar-timeline .rct-calendar-header {
    border-right: 1px solid #bbb;
  }
`;