import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Select from 'react-select';
import Button from '@material-ui/core/Button';
import SelectWrapper from 'ui/components/SelectWrapper';
import { CustomStyles } from 'ui/components/CustomSelectComponents';
import CustomDatePicker from 'ui/components/DatePicker/CustomDatePicker';
import CustomTimePickers from 'ui/components/RequestForm/components/CustomTimePickers';
import DayOffTypeSwitcher from 'ui/components/RequestForm/components/DayOffTypeSwitcher';
import TextSection from 'ui/components/RequestForm/components/TextSection';

import { optionType } from 'utils/constants';
import { StyledForm } from './RequestForm.style';

const validation = yup.object().shape({
  type: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
  startDate: yup.date().nullable(),
  endDate: yup.date(),
  isAllDay: yup.bool().default(true),
  timeStart: yup.date().default(null)
    .when('timeEnd',
      (timeEnd, yup) => timeEnd && yup.max(timeEnd, 'Не может быть позже времени конца')),
  timeEnd: yup.date().default(null)
    .when('timeStart',
      (timeStart, yup) => timeStart && yup.min(timeStart, 'Не может быть раньше времени начала')),
  title: yup.string().required('Введите заголовок заявки'),
  comment: yup.string(),
}, ['timeStart', 'timeEnd']);

const minDate = new Date();

const RequestForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      type: optionType[0],
      isAllDay: true,
      title: '',
      comment: '',
      startDate: new Date(),
      endDate: new Date(),
      timeStart: new Date(),
      timeEnd: new Date(),
    },
    validationSchema: validation,
    onSubmit: () => props.onSubmit(formatData(), () => {
      resetForm({
        values: {
          type: values.type,
          isAllDay: true,
          comment: '',
          title: '',
          startDate: new Date(),
          endDate: new Date(),
          timeStart: new Date(),
          timeEnd: new Date(),
        },
      });
    }),
  });

  const isDateRange = useMemo(() => ['vacation', 'medical'].includes(values.type.value), [values.type]);

  const formatData = useCallback(() => {
    const newRequestData = {
      type: values.type.value,
      title: values.title,
      comment: values.comment,
      dateTo: values.endDate,
    };

    const isDateRange = ['vacation', 'medical'].includes(values.type.value);

    if (isDateRange) {
      newRequestData.dateFrom = values.startDate;
    }

    if (values.type.value === 'dayOff' && !values.isAllDay) {
      const from = new Date(values.startDate);
      from.setHours(values.timeStart.getHours());
      from.setMinutes(values.timeStart.getMinutes());
      from.setSeconds(0);

      const to = new Date(values.endDate);
      to.setHours(values.timeEnd.getHours());
      to.setMinutes(values.timeEnd.getMinutes());
      to.setSeconds(0);

      newRequestData.dateFrom = from;
      newRequestData.dateTo = to;
    }

    return newRequestData;
  }, [values]);

  const toggleDayOffType = () => {
    handleChange({ target: { value: !values.isAllDay, name: 'isAllDay' } });
  };

  const onSelectChange = (value, data) => {
    handleChange({ target: { value, name: data.name } });
  };

  const onDateChange = (value) => {
    handleChange({ target: { value: value.startDate || value, name: 'startDate' } });
    handleChange({ target: { value: value.endDate || value, name: 'endDate' } });
  };

  return (
    <StyledForm onSubmit={handleSubmit} >
      <SelectWrapper className='form-input-item select-wrapper'>
        <Select
          value={values.type}
          placeholder='Тип заявки'
          hideSelectedOptions={false}
          classNamePrefix='select'
          isClearable={false}
          options={optionType}
          onChange={onSelectChange}
          styles={CustomStyles}
          name='type'
        />
      </SelectWrapper>

      <CustomDatePicker
        className='form-input-item'
        isRange={isDateRange}
        onChange={onDateChange}
        startDate={values.startDate}
        endDate={values.endDate}
        value={values.endDate}
        minDate={minDate}
      />

      <CustomTimePickers
        className='form-input-item'
        values={values}
        errors={errors}
        touched={touched}
        timeHandler={handleChange}
        blurHandler={handleBlur}
      />

      <DayOffTypeSwitcher
        className='form-input-item'
        values={values}
        radioHandler={toggleDayOffType}
      />

      <TextSection
        className='form-input-item'
        values={values}
        touched={touched}
        errors={errors}
        onChange={handleChange}
        blurHandler={handleBlur}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Отправить
      </Button>
    </StyledForm>
  );
};

RequestForm.propTypes = {
  onSubmit: PropTypes.func,
};

RequestForm.defaultProps = {
  onSubmit: () => null,
};

export default RequestForm;
