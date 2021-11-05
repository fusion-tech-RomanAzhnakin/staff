import React from 'react';
import ReactDOM from 'react-dom';

import App from 'App';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from 'ui/styles/GlobalStyles';
import StyledComponentsTheme from 'ui/styles/StyledComponentsTheme';
import MaterialTheme from 'ui/styles/MaterialTheme';

import store from 'store';
import reportWebVitals from 'reportWebVitals';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-calendar-timeline/lib/Timeline.css';

ReactDOM.render(
  <StoreProvider store={store}>
    <BrowserRouter>
      <StyledComponentsTheme>
        <MaterialTheme>
          <>
            <GlobalStyles />

            <App />
          </>
        </MaterialTheme>
      </StyledComponentsTheme>
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
