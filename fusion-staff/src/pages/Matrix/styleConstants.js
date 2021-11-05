import { darken } from 'polished';

export default {
  colors: {
    groupBg: '#F3F2F3',
    sectionBg: '#CFC9D6',
    section: '#80728F',
    text: '#301949',
    grayDark: '#A79DB1',
    gray: '#CAC4D0',
    grayLight: '#E5E2E8',
    grayLighten: '#F2F0F3',
    alarm: '#ED5454',
  },
  gradients: {
    high: 'linear-gradient(80.69deg, #68C887 3.09%, #9EE39C 99.85%)',
    low: 'linear-gradient(80.69deg, #EAB652 3.09%, #F8E16A 99.85%)',
    none: 'linear-gradient(80.69deg, #FAFAFA 3.09%, #FAFAFA 99.85%)',
  },
  levelColors: {
    none: darken(0.1, '#FAFAFA'),
    low: darken(0.1, '#F8E16A'),
    high: darken(0.1, '#9EE39C'),
  },
  shadows: {
    main: '0px 4px 20px rgba(167, 157, 177, 0.12)',
    know: '0px 4px 20px rgba(108, 202, 136, 0.4)',
    heard: '0px 4px 20px rgba(241, 206, 62, 0.4)',
    hover: '0px 4px 20px rgba(0, 0, 0, 0.04)',

    none: `inset 0px 0px 0px 3px ${darken(0.1, '#FAFAFA')}`,
    low: `inset 0px 0px 0px 3px ${darken(0.1, '#F8E16A')}`,
    high: `inset 0px 0px 0px 3px ${darken(0.1, '#9EE39C')}`,
    gap: 'inset 0px 0px 0px 5px white',
  },
};
