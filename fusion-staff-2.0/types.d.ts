import theme from './src/ui/styles/StyledComponentsTheme/themes/main';
type CustomTheme = typeof theme
declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme { }
}

import { fullStore } from './src/store/rootReducer';
type StoreType = typeof fullStore;
declare module 'react-redux' {
  export interface DefaultRootState extends StoreType { }
}
