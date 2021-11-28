import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import FilterListIcon from '@material-ui/icons/FilterList';
import InputLabel from '@material-ui/core/InputLabel';
// import Modal from '@material-ui/core/Modal';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import {
//   Tabs,
//   Tab,
// } from '@material-ui/core';

import SelectWrapper from 'ui/components/SelectWrapper';
import { CustomStyles } from 'ui/components/CustomSelectComponents';
import { getFullName } from 'utils/utils';
import { clearFilter,
  updateFilterField,
  updateSearch,
  // setGroupsTech,
} from '../store/reducer';

import TechModal from './TechModal';

const ProjectsFilter = () => {
  const history = useHistory();
  const [showFilters, setShowFilters] = useState(true);
  const projects = useSelector((store) => store.projects);
  const { usersList, technologies } = useSelector((store) => store.enums);

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const toggleTechModal = () => setOpenModal((prev) => !prev);
  // const handleCloseTechModal = () => setOpen(false);

  // const [collapseTech, setCollapse] = useState(false);
  // const toggleCollapse = () => setCollapse((prev) => !prev);

  // const [tabIndex, setTabIndex] = useState(0);
  // const onTabIndexChange = (ev, tabIndex) => {
  //   setTabIndex(tabIndex);
  // };

  // const [editedId, setEditedId] = useState(null);

  // const [groups, setGroups] = useState();

  useEffect(() => {
    if (projects.filters.user && typeof projects.filters.user[0] === 'number') {
      const usersFilter = projects.filters.user.map((userId) => { return ({ value: usersList[userId].login, label: getFullName(usersList[userId], 'full', 'eng'), id: userId }); });
      const payload = { name: 'user', value: usersFilter };
      dispatch(updateFilterField(payload));
    }
    if (projects.filters.technologies && typeof projects.filters.technologies[0] === 'number') {
      const technologiesFilter = projects.filters.technologies.map((idTechnology) => {
        const tech = technologies.filter((item) => item.id === idTechnology);
        return ({ value: tech[0].title, label: tech[0].title, id: tech[0].id });
      });
      const payload = { name: 'technologies', value: technologiesFilter };
      dispatch(updateFilterField(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = useMemo(
    () => ({
      technologiesOption:
        technologies &&
        technologies.map((technologie) => ({
          value: technologie.title,
          label: technologie.title,
          id: technologie.id,
        })),
      developersOption:
        usersList &&
        Object.values(usersList).map((user) => ({
          value: user.login,
          label: getFullName(user, 'full', 'eng'),
          id: user.id,
        })),
    }),
    [technologies, usersList],
  );

  const showToggle = () => {
    setShowFilters((prev) => !prev);
  };

  const selectHandler = (value, event) => {
    const payload = { name: event.name, value };
    dispatch(updateFilterField(payload));
  };

  const isEnabled = Object.keys(projects.filters).some((item) => {
    if (
      Array.isArray(projects.filters[item]) ||
      typeof projects.filters[item] === 'string'
    ) {
      return projects.filters[item].length;
    }
    return !projects.filters[item] === null;
  });

  const searchHandler = (event) => {
    dispatch(updateSearch(event.target.value));
  };

  const clear = () => {
    dispatch(clearFilter());
  };

  const handleAddProject = () => {
    history.push('create-project');
  };

  return (
    <>
      <div className='containerFilter' >
        <div className='containerInner'>
          <FormControlLabel
            control={<FilterListIcon color={showFilters ? 'inherit' : 'primary'} />}
            onClick={showToggle}
            label='Фильтры'
          />

          <Button
            onClick={handleAddProject}
            variant="contained"
            color="primary"
          >
            Создать проект
          </Button>
        </div >

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleTechModal}
            fullWidth
          >
            Технологии
          </Button>
        </div>
      </div>
      <TechModal
        open={openModal}
        onClose={toggleTechModal}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      />

      <Collapse in={showFilters}>
        <Grid
          container
          spacing={2}
          alignItems='center'
        >
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              value={projects.filters.search}
              onChange={searchHandler}
              name='search'
              label='Название'
              fullWidth
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <SelectWrapper>
              <InputLabel>Разработчики</InputLabel>
              <Select
                value={projects.filters.user}
                name='user'
                options={options.developersOption}
                onChange={selectHandler}
                closeMenuOnSelect={false}
                isClearable={true}
                classNamePrefix='select'
                placeholder='Все'
                styles={CustomStyles}
                isMulti
              />
            </SelectWrapper>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <SelectWrapper>
              <InputLabel>Технологии</InputLabel>
              <Select
                value={projects.filters.technologies}
                name='technologies'
                options={options.technologiesOption}
                onChange={selectHandler}
                closeMenuOnSelect={false}
                isClearable={true}
                classNamePrefix='select'
                placeholder='Все'
                styles={CustomStyles}
                isMulti
              />
            </SelectWrapper>
          </Grid>

          <Grid container className='buttonClearFilter'>
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

export default ProjectsFilter;
