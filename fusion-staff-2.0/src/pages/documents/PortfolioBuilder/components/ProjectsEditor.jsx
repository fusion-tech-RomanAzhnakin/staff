import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _defaultsDeep from 'lodash/defaultsDeep';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import EditableProject from 'pages/documents/PortfolioBuilder/components/EditableProject';
import StyledDialog from 'pages/documents/PortfolioBuilder/components/ProjectsEditor.style';

import { setIsProjectsEditorOpen, setSelectedProjects } from 'pages/documents/PortfolioBuilder/store/reducer';

function ProjectsEditor() {
  const dispatch = useDispatch();
  const {
    isProjectsEditorOpen,
    selectedProjects,
  } = useSelector(({ portfolioBuilder }) => portfolioBuilder);

  const [editableProjects, setEditableProjects] = useState([]);

  const muiPaperClass = {
    className: 'projects-editor__wrapper',
  };

  const resetProjectsEditChanges = () => {
    setEditableProjects(selectedProjects);
  };

  const closeProjectsEditor = () => {
    dispatch(setIsProjectsEditorOpen(false));
    resetProjectsEditChanges();
  };

  const handleProjectChange = (value, index) => {
    const newData = [...editableProjects];

    newData[index] = _defaultsDeep(value, newData[index]);

    setEditableProjects(newData);
  };

  const handleSubmit = () => {
    dispatch(setSelectedProjects(editableProjects));

    closeProjectsEditor();
  };

  useEffect(() => {
    setEditableProjects(selectedProjects);
  }, [selectedProjects]);

  return (
    <StyledDialog
      maxWidth="lg"
      scroll="body"
      PaperProps={muiPaperClass}
      open={isProjectsEditorOpen}
      onClose={closeProjectsEditor}
    >
      <DialogTitle>
        Редактор проектов
      </DialogTitle>

      <DialogContent className="projects-editor__projects">
        {editableProjects.map((project, index) => (
          <EditableProject
            key={project.value}
            index={index}
            title={project.label}
            description={project.data.description}
            techs={project.data.technologies}
            onChange={handleProjectChange}
          />
        ))}
      </DialogContent>

      <DialogActions className="projects-editor__container">
        <Button color="primary" onClick={handleSubmit}>
          Сохранить
        </Button>

        <Button color="primary" onClick={closeProjectsEditor}>
          Отмена
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default ProjectsEditor;
