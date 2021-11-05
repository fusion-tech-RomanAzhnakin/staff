import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import SelectWrapper from 'ui/components/SelectWrapper';
import ProjectsEditor from 'pages/documents/PortfolioBuilder/components/ProjectsEditor';
import StyledForm from 'pages/documents/PortfolioBuilder/components/PortfolioBuilderForm.style';

import { getProjectsThunk, createPortfolioThunk } from 'pages/documents/PortfolioBuilder/store/thunks';
import {
  reset,
  setMainTitle,
  setSelectedTechnologies,
  setSelectedProjects,
  setIsProjectsEditorOpen,
} from 'pages/documents/PortfolioBuilder/store/reducer';

function PortfolioBuilderForm() {
  const dispatch = useDispatch();
  const {
    mainTitle,
    technologiesOptions,
    selectedTechnologies,
    projects,
    selectedProjects,
    isSubmitBtnDisable,
  } = useSelector(({ portfolioBuilder }) => portfolioBuilder);

  const handleInputChange = (ev) => {
    dispatch(setMainTitle(ev.target.value));
  };

  const handleTechnologiesChange = (value) => {
    dispatch(setSelectedTechnologies(value || []));
  };

  const handleProjectsChange = (value) => {
    dispatch(setSelectedProjects(value || []));
  };

  const openProjectsEditor = () => {
    if (!selectedProjects.length) { return; }
    dispatch(setIsProjectsEditorOpen(true));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const projects = selectedProjects.map((project) => {
      const projectData = {
        title: project.data.title,
        description: project.data.description,
        description_ru: project.data.description_ru,
        role: project.data.role,
        technologies: project.data.technologies.map((tech) => ({
          title: tech.label,
        })),
      };

      return projectData;
    });

    const data = {
      mainTitle: mainTitle.trim(),
      projects,
    };

    dispatch(createPortfolioThunk(data));
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextField
        className="portfolio-builder-form__input"
        label="Главный заголовок"
        name="mainTitle"
        type="text"
        variant="outlined"
        margin="normal"
        value={mainTitle}
        fullWidth
        onChange={handleInputChange}
      />

      <Typography
        className="portfolio-builder-form__select-title"
        component="h4"
        variant="h2"
      >
        Фильтр проектов по технологиям
      </Typography>

      <SelectWrapper>
        <Select
          className="portfolio-builder-form__select"
          classNamePrefix="select"
          name="technologies"
          placeholder="Выбрать технологии"
          options={technologiesOptions}
          value={selectedTechnologies}
          closeMenuOnSelect={false}
          isMulti
          onChange={handleTechnologiesChange}
          onBlur={() => dispatch(getProjectsThunk())}
        />
      </SelectWrapper>

      <Typography
        className="portfolio-builder-form__select-title"
        component="h4"
        variant="h2"
      >
        Проекты
      </Typography>

      <SelectWrapper>
        <Select
          className="portfolio-builder-form__select"
          classNamePrefix="select"
          name="projects"
          placeholder="Выбрать проекты"
          options={projects}
          value={selectedProjects}
          closeMenuOnSelect={false}
          isMulti
          onChange={handleProjectsChange}
        />
      </SelectWrapper>

      <Button
        className="portfolio-builder-form__btn"
        variant="contained"
        color="primary"
        onClick={openProjectsEditor}
      >
        Редактировать проекты
      </Button>

      <ProjectsEditor />

      <Container className="portfolio-builder-form__container">
        <Button
          className="portfolio-builder-form__btn"
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitBtnDisable}
        >
          Создать портфолио
        </Button>

        <Button
          className="portfolio-builder-form__btn"
          variant="contained"
          color="primary"
          onClick={() => dispatch(reset())}
        >
          Сбросить
        </Button>
      </Container>
    </StyledForm>
  );
}

export default PortfolioBuilderForm;
