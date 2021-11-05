import React, { memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Router from 'Router';
import SelectAnchor from 'ui/components/SelectAnchor';
import Loader from 'ui/components/Loader';
import Toastify from 'ui/containers/Toastify';
import Header from 'ui/containers/Header';
import PageTitle from 'ui/containers/PageTitle';
import Sidebar from 'ui/containers/Sidebar';

import { authorize } from 'store/main/thunks';
import { getAllTechnologies, getUsersList } from 'store/enums/thunks';

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const user = useSelector(({ main }) => main.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authorize());

      setIsAuthorized(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getAllTechnologies());
      dispatch(getUsersList());
    }
  }, [user, dispatch]);

  if (!isAuthorized) { return <Loader show />; }

  return (
    <>
      <Toastify
        autoClose={3000}
        draggable
        newestOnTop
        closeButton={false}
      />

      <SelectAnchor />

      <Loader />

      <Header />
      <PageTitle />

      <Sidebar />

      <Router />
    </>
  );
};

export default memo(App);
