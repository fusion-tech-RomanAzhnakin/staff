import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { setTab } from 'pages/Account/store';
import { toggleLoader } from 'store/main/reducer';
import { defaultErrorMessage } from 'utils/constants';
import requestsApi from 'api/requestsApi';
import { useTabCheck } from 'pages/Account/customUseEffect';
import UserRequestInfo from './components/UserRequestInfo';

const UserRequests = () => {
  const dispatch = useDispatch();
  const [userRequestList, setuserRequestList] = useState([]);

  const { id } = useSelector(({ main }) => main.user);
  const { id: currentProfileId } = useSelector(
    ({ userAccount }) => userAccount.user,
  );

  const isOwner = id === currentProfileId;

  const getAllRequests = useCallback(async () => {
    try {
      dispatch(toggleLoader(true));

      const filter = {
        user_id: id,
      };

      const { data } = await requestsApi.getList({ filter });

      setuserRequestList(data);
    } catch (err) {
      if (err.data.errors) {
        err.data.errors.map((item) => toast.error(item.message));
        return;
      }
      toast.error(defaultErrorMessage);
    } finally {
      dispatch(toggleLoader(false));
    }
  }, [id, dispatch]);

  useEffect(() => {
    getAllRequests();
  }, [getAllRequests]);

  const isSelected = useTabCheck('myRequests');

  if (!isSelected) return null;

  if (!isOwner && isSelected) {
    dispatch(setTab(0));
  }

  return (
    <>
      {userRequestList.length ? (
        userRequestList.map((request) => (
          <UserRequestInfo
            key={request.id}
            request={request}
            getList={getAllRequests}
          />
        ))
      ) : (
        <p>Нет заявок</p>
      )}
    </>
  );
};

export default UserRequests;
