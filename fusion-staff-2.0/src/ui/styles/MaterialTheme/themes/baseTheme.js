import { transparentize } from 'polished';

import theme from 'ui/styles/StyledComponentsTheme/themes/main';

const fontSize = +theme.font.size.globalValue.split(/[^0-9]/)[0];
const duration = theme.transitionValue * 1000;

const baseTheme = {
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: theme.screen.sm + 1,
      md: theme.screen.md + 1,
      lg: theme.screen.lg + 1,
      xl: theme.screen.xLg + 1,
    },
  },
  palette: {
    primary: theme.colors.primary,
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: transparentize(0.5, 'black'),
      },
    },
    MuiLink: {
      root: {
        color: theme.colors.mainText,
      },
    },
    MuiAvatarGroup: {
      avatar: {
        border: 'none',

        '&.sm': {
          height: '20px',
          width: '20px',
          fontSize: '14px',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        '&.transparent-background': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiCardActions: {
      root: {
        padding: '16px',
      },
    },
  },
  typography: {
    htmlFontSize: fontSize,
    fontFamily: 'inherit',
    fontSize,
    fontWeightLight: theme.font.weight.sm,
    fontWeightRegular: theme.font.weight.md,
    fontWeightMedium: theme.font.weight.lg,
    fontWeightBold: theme.font.weight.xLg,
    button: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.md,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textTransform: 'none',
    },
    h1: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.xLg,
      fontSize: theme.font.size.xLg,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h2: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.lg,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h3: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.md,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h4: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.sm,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h5: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.sm,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h6: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.xSm,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    subtitle1: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.md,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    subtitle2: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.md,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    body1: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.md,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    body2: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.md,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    caption: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.md,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    overline: {
      fontFamily: 'inherit',
      fontWeight: theme.font.weight.md,
      fontSize: theme.font.size.md,
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textTransform: 'uppercase',
    },
  },
  zIndex: {
    mobileStepper: 1,
    appBar: 1,
    drawer: 10,
    modal: 50,
    snackbar: 1,
    tooltip: 60,
    speedDial: 20,
  },
  shadows: new Array(25).fill('none'), // Disable all shadows
  shape: {
    borderRadius: 0,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: duration,
      shorter: duration,
      short: duration,
      standard: duration,
      complex: duration,
      enteringScreen: duration,
      leavingScreen: duration,
    },
  },
  props: {},
  direction: 'ltr',
};

export default baseTheme;
