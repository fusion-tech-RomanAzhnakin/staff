import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import FilterListIcon from '@material-ui/icons/FilterList';

import {
  updateIsDev,
  updateSearch,
  updateFilterField,
  clearFilter,
} from 'pages/Staff/store/reducer';
import SelectWrapper from 'ui/components/SelectWrapper';
import { CustomStyles } from 'ui/components/CustomSelectComponents';

import { userRolesRu, userTechRolesRu, userStatusesRu } from 'utils/constants';

const userIsDevRu = {
  isDev: 'Разработчики',
  other: 'Не разработчики',
};

const objectToOption = (value) => {
  return Object.keys(value).map((key) => ({
    label: value[key],
    value: key,
  }));
};

const optionIsDev = objectToOption(userIsDevRu);
const optionRoles = objectToOption(userRolesRu);
const optionTechRoles = objectToOption(userTechRolesRu);
const optionStatus = objectToOption(userStatusesRu);

const StaffFilter = () => {
  const [showFilters, setShowFilters] = useState(true);
  const staff = useSelector(({ staff }) => staff);
  const dispatch = useDispatch();

  const showToggle = () => {
    setShowFilters((prev) => !prev);
  };

  const selectHandler = (value, event) => {
    const payload = { name: event.name, value };
    dispatch(updateFilterField(payload));
  };

  const isEnabled = Object.keys(staff.filter).some((item) => {
    if (
      Array.isArray(staff.filter[item]) ||
      typeof staff.filter[item] === 'string'
    ) {
      return staff.filter[item].length;
    }
    return !staff.filter[item] === null;
  });

  const devHandler = (value) => {
    switch (value?.value) {
      case 'isDev':
        dispatch(updateIsDev(true));
        break;
      case 'other':
        dispatch(updateIsDev(false));
        break;
      default:
        dispatch(updateIsDev(null));
        break;
    }
  };

  const searchHandler = (event) => {
    dispatch(updateSearch(event.target.value));
  };

  const clear = () => {
    dispatch(clearFilter());
  };

  return (
    <>
      <FormControlLabel
        control={<FilterListIcon color={showFilters ? 'inherit' : 'primary'} />}
        onClick={showToggle}
        label='Фильтры'
      />

      <Collapse in={showFilters}>
        <Grid
          container
          className='fitlers'
          spacing={2}
          alignItems='center'
        >
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              value={staff.filter.search}
              onChange={searchHandler}
              name='search'
              label='Поиск'
              fullWidth
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SelectWrapper>
              <InputLabel>Роли</InputLabel>
              <Select
                value={staff.filter.role}
                name='role'
                options={optionRoles}
                onChange={selectHandler}
                closeMenuOnSelect={false}
                isClearable={true}
                // classNamePrefix='select'
                placeholder='Все'
                styles={CustomStyles}
                isMulti
              />
            </SelectWrapper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SelectWrapper>
              <InputLabel>Должности</InputLabel>
              <Select
                name='techRole'
                value={staff.filter.techRole}
                options={optionTechRoles}
                onChange={selectHandler}
                closeMenuOnSelect={false}
                isClearable={true}
                // classNamePrefix='select'
                placeholder='Все'
                styles={CustomStyles}
                isMulti
              />
            </SelectWrapper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SelectWrapper>
              <InputLabel>Статус</InputLabel>
              <Select
                name='status'
                value={staff.filter.status}
                options={optionStatus}
                onChange={selectHandler}
                closeMenuOnSelect={false}
                isClearable={true}
                // classNamePrefix='select'
                placeholder='Все активные'
                styles={CustomStyles}
                isMulti
              />
            </SelectWrapper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SelectWrapper>
              <InputLabel>Участие в разработке</InputLabel>
              <Select
                name='isDev'
                options={optionIsDev}
                onChange={devHandler}
                hideSelectedOptions={false}
                // classNamePrefix='select'
                placeholder='Все'
                styles={CustomStyles}
                isClearable
              />
            </SelectWrapper>
          </Grid>
          <Divider className='divider' light />
          <Grid container justify='flex-end'>
            <Grid item xs={12} md={6} lg={3}>
              <Button
                disabled={!isEnabled}
                variant='contained'
                onClick={clear}
                fullWidth
              >
                Очистить фильтр
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

export default StaffFilter;
