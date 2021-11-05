import styled from 'styled-components';

import { ToastContainer } from 'react-toastify';

export default styled(ToastContainer)`
  .Toastify__toast {}

  .Toastify__toast-body {}

  .Toastify__close-button {}

  .Toastify__progress-bar {}

  /* Success type */
  .Toastify__toast--success {
    .Toastify__toast-body {}

    .Toastify__progress-bar {}
  }

  /* Info type */
  .Toastify__toast--info {
    .Toastify__toast-body {}

    .Toastify__progress-bar {}
  }

  /* Warning type */
  .Toastify__toast--warning {
    .Toastify__toast-body {}

    .Toastify__progress-bar {}
  }

  /* Error type */
  .Toastify__toast--error {
    .Toastify__toast-body {}

    .Toastify__progress-bar {}
  }
`;
