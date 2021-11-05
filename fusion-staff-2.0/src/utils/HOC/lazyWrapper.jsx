import React, { memo, Suspense } from 'react';

import Loader from 'ui/components/Loader';

export default (Component) => {
  const Wrapped = (props) => (
    <Suspense fallback={<Loader show />}>
      <Component {...props} />
    </Suspense>
  );

  return memo(Wrapped);
};
