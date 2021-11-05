import transparentize from 'polished/lib/color/transparentize';
import darken from 'polished/lib/color/darken';
import lighten from 'polished/lib/color/lighten';

const primaryColor = '#B163FF';
const errorColor = '#f44336';

const colors = {
  primaryGray: '#484848',
  redMain: '#f44336',
};

const screen = {
  sm: 425,
  md: 768,
  lg: 1024,
  xLg: 1920,
};

const theme = {
  colors: {
    ...colors,
    erp: {
      holiday: transparentize(0.8, '#F44336'),
    },
    pageBackground: '#FAFAFA',
    gray: {
      main: '#69686b',
      light: '#c4c3c5',
    },
    mainText: '#000000',
    navbar: {
      background: colors.primaryGray,
      backgroundDark: 'black',
      text: 'lightgray',
      textLight: 'white',
    },
    modal: {
      background: colors.primaryGray,
    },
    primary: {
      main: primaryColor,
      light: lighten(0.1, primaryColor),
      dark: darken(0.1, primaryColor),
      contrastText: '#FFFFFF',
    },
    error: {
      main: errorColor,
      light: lighten(0.1, errorColor),
      dark: darken(0.1, errorColor),
      contrastText: '#FFFFFF',
    },
    diagram: {
      headerBorder: '#44444420',
      text: '#000000c0',
    },
  },
  padding: {
    sSm: '2px 5px',
    sm: '3px 10px',
    md: '5px 15px',
    lg: '10px 20px',
    xLg: '15px 30px',
  },
  margin: {
    formInput: 30,
    submitButton: 40,
  },
  font: {
    size: {
      globalValue: '16px',
      xSm: '0.5rem',
      sm: '0.8rem',
      md: '1rem',
      lg: '1.5rem',
      xLg: '2rem',
    },
    family: {
      main: "'Noto Sans', sans-serif",
      secondary: 'Montserrat, sans-serif',
    },
    weight: {
      xSm: 300,
      sm: 400,
      md: 500,
      lg: 700,
      xLg: 900,
    },
  },
  screen,
  transitionValue: 0.15,
  transition: '0.15s',
  header: {
    minHeight: '58px',
  },
  sidebar: {
    width: {
      open: '306px',
      closed: '87px',
    },
  },
  respond: (screenSize, content) => {
    const breakpoint = Object.entries(screen).find(
      ([breakpointName]) => screenSize === breakpointName,
    );
    if (breakpoint) {
      const [, breakpointValue] = breakpoint;
      return `@media (max-width: ${breakpointValue}px) {
      ${content}
    }`;
    }
    return '';
  },
};

export default theme;
