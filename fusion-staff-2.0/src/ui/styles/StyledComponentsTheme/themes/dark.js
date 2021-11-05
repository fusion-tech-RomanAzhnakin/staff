import _defaultsDeep from 'lodash/defaultsDeep';

import main from 'ui/styles/StyledComponentsTheme/themes/main';

export default _defaultsDeep(
  {
    colors: {
      pageBackground: '#3C3A3F',
      mainText: 'white',
      navbar: {
        background: '#363239',
        backgroundDark: 'black',
        text: '#A79DB1',
        textLight: 'white',
      },
      diagram: {
        headerBorder: '#bbbbbb20',
        text: 'ffffffc0',
      },
    },
  },
  main,
);
