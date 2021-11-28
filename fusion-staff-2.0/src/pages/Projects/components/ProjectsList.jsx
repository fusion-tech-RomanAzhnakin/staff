import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toggleLoader } from 'store/main';
import ReactQuill from 'react-quill';

import _ from 'lodash';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import CustomPagination from 'ui/components/Pagination/Pagination';

import { defaultErrorMessage } from 'utils/constants';
import projectApi from 'api/projectApi';
import useDebouncedFunction from 'utils/hooks/useDebouncedFunction';
import { getFullName } from 'utils/utils';
import { arrayToItems } from 'utils/arraysToComponents';
import { getProjects } from '../store/thunks';
import { updateSort, setProjects } from '../store/reducer';

const getRowsFromData = (columns, data) => {
  if (!Array.isArray(data)) {
    return;
  }
  return data.map((row) => _.pick(row, columns.map((column) => column.dataKey)));
};

const ProjectsList = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [indexProject, setIndexProject] = useState(0);
  const handleOpen = (rowIndex) => { setIndexProject(rowIndex); setOpen(true); };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { projectsList,
    sortDirection,
    filters,
    sortBy,
    pagination } = useSelector((state) => state.projects);
  const debounceSearch = useDebouncedFunction(
    () => dispatch(
      getProjects(
        // {
        //   sortBy: sortBy,
        //   sortDirection: sortDirection,
        //   filter: filter,
        // }
      ),
    ),
    500,
    true,
  );

  useEffect(() => {
    debounceSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, sortBy, sortDirection, filters]);

  // const paginationSet = useMemo(() => {
  //   return {
  //     ...pagination,
  //     onChange: (event, page) => dispatch(getProjects(
  //       {
  //         pagination: { ...pagination, page },
  //       },
  //     )),
  //   };
  // }, [pagination, dispatch]);

  const data = useMemo(() => {
    if (_.isEmpty(projectsList)) {
      return;
    }
    return projectsList.map((project) => {
      const arrUsers = project.user.map((item) => { return { login: getFullName(item, 'full', 'eng') }; });
      const projectsTabelColumns = _.pick(
        project,
        columns.map((projectColumn) => projectColumn.dataKey),
      );
      projectsTabelColumns.user = arrayToItems(arrUsers, 'login', ', ', 'a');
      projectsTabelColumns.technologies = arrayToItems(projectsTabelColumns.technologies, 'title', ', ', 'a');
      return projectsTabelColumns;
    });
  }, [projectsList]);

  const onChangeSort = (direction) => {
    const updateDirection = direction === 'straight' ? 'reverse' : 'straight';
    dispatch(updateSort({ sortDirection: updateDirection }));
  };

  const rows = useMemo(() => {
    return getRowsFromData(columns, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, data]);

  const handleEditProject = () => {
    history.push({ pathname: 'edit-project', state: indexProject });
  };

  const handleDeleteProject = async () => {
    try {
      dispatch(toggleLoader(true));
      await projectApi.deleteProject(projectsList[indexProject].id);
      const newList = [...projectsList];
      newList.splice(indexProject, 1);
      dispatch(setProjects(newList));
      handleClose();
      toast.success('Успех! Проект удален');
    } catch (err) {
      toast.error(defaultErrorMessage);
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box className='modalTechnologies' sx={style} >
          <Typography id="modal-modal-title" variant="h1" component="h2">
            {projectsList.length && projectsList[indexProject].title}
          </Typography>
          {/* <Typography id="modal-modal-title" variant="h3" component="h3">
            {projectsList.length && projectsList[indexProject].description}
          </Typography> */}
          <ReactQuill
            name="description"
            readOnly={true}
            hideToolbar={true}
            label="Описание:"
            modules={ { toolbar: false } }
            value={projectsList.length && projectsList[indexProject].description}
          />
          <Grid className='buttonModal' >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEditProject}
            >
              Редактировать
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleDeleteProject}
            >
              Удалить
            </Button>
          </Grid>
        </Box>
      </Modal>
      <TableContainer>
        <Table className='blockFilter' >
          <TableHead>
            <TableRow>
              <TableCell
                width={'50%'}
                onClick={() => onChangeSort(sortDirection)
                }
              >
                <TableSortLabel
                  active={true}
                  direction={
                    sortDirection === 'straight'
                      ? 'asc'
                      : 'desc'
                  }
                >
                  Название
                </TableSortLabel>
              </TableCell>

              <TableCell width={'25%'}>
                Разработчики
              </TableCell>

              <TableCell width={'25%'}>
                Технологии
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows &&
              rows.map((row, rowIndex) => (
                <TableRow key={`row${rowIndex}`} onClick={() => handleOpen(rowIndex)} >
                  {columns.map((column, cellIndex) => {
                    return (
                      <TableCell key={`row${rowIndex}${cellIndex}`} >
                        {!_.isEmpty(row[column.dataKey])
                          ? row[column.dataKey]
                          : '-'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!_.isEmpty(pagination) && (
          <div className="tabelPagination">
            <CustomPagination pagination={pagination} />
          </div>
        )}
      </TableContainer>
    </>
  );
};

const columns = [
  {
    dataKey: 'title',
    columnTitle: 'Название',
  },
  {
    dataKey: 'user',
    columnTitle: 'Разработчики',
  },
  {
    dataKey: 'technologies',
    columnTitle: 'Технологии',
  },
];

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

export default ProjectsList;
