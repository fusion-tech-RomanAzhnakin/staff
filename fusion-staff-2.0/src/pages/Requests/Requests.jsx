import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import RequestForm from 'ui/components/RequestForm/RequestForm';

import { toggleLoader } from 'store/main/reducer';
import requestsApi from 'api/requestsApi';
import { defaultErrorMessage } from 'utils/constants';
import { StyledMainPageContent } from './Requests.style';

const Requests = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, resetForm) => {
    try {
      dispatch(toggleLoader(true));
      await requestsApi.create(values);

      toast.success('Заявка успешно создана!');

      resetForm();
    } catch (err) {
      if (err.data.errors) {
        err.data.errors.map((item) => toast.error(item.message));
        return;
      }

      toast.error(defaultErrorMessage);
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  return (
    <StyledMainPageContent>
      <RequestForm onSubmit={onSubmit} />
    </StyledMainPageContent>
  );
};

export default Requests;
