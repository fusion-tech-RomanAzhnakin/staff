import React, { useState, useMemo } from 'react';
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
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import SelectWrapper from 'ui/components/SelectWrapper';
import { CustomStyles } from 'ui/components/CustomSelectComponents';
// import TechModal from './TechnologyModal';

import { getFullName } from 'utils/utils';
import { clearFilter, updateFilterField, updateSearch } from '../store/reducer';

const ProjectsFilter = () => {
  const history = useHistory();
  const [showFilters, setShowFilters] = useState(true);
  const projects = useSelector((store) => store.projects);
  const { usersList, technologies } = useSelector((store) => store.enums);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // const handleTechnology = () => {

  // }

  return (
    <>
      <Grid container className='filterHead' >
      
        {/* <Grid item xs={12} md={2} lg={2}> */}
          <FormControlLabel
            control={<FilterListIcon color={showFilters ? 'inherit' : 'primary'} />}
            onClick={showToggle}
            label='Фильтры'
          />
        {/* </Grid> */}

        {/* <Grid item xs={12} md={8} lg={8} > */}
          <Button
            onClick={handleAddProject}
            variant="contained"
            color="primary"
          >
            Создать проект
          </Button>
        {/* </Grid> */}

        {/* <Grid item xs={3} md={2} lg={2} >
          <Grid container justify='flex-end' > */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              Технологии
            </Button>
          {/* </Grid>
        </Grid> */}

      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
      // aria-labelledby="modal-modal-title"
      // aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h1" component="h2">
            Технологии
          </Typography>
        </Box>
      </Modal>

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
          <Grid container xs={12} md={12} lg={12} className='buttonFilter' >
            <Grid item>
              <Button
                disabled={!isEnabled}
                variant='contained'
                onClick={clear}
              // fullWidth
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default ProjectsFilter;
