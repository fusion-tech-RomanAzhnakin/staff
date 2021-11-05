import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CustomSelect from 'pages/Staff/components/CustomSelect';

import IconButton from '@material-ui/core/IconButton';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import Avatar from 'ui/components/Avatar';

import {
  routePaths,
  userTechRolesRu,
  userStatusesRu,
  userRolesRu,
  getKey,
} from 'utils/constants';
import { getFullName } from 'utils/utils';
import { updateFromAdmin } from 'api/userApi';
import { updateList } from 'pages/Staff/store/thunks';
import useDebouncedFunction from 'utils/hooks/useDebouncedFunction';

const StaffList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const activeUser = useSelector(({ main }) => main.user);
  const staff = useSelector(({ staff }) => staff);
  const debounceSearch = useDebouncedFunction(
    () => dispatch(
      updateList({
        sortBy: staff.sortBy,
        sortDirection: staff.sortDirection,
        filter: staff.filter,
      }),
    ),
    500,
    true,
  );

  const updateUsersList = async (sortBy, sortDirection, filter) => {
    await dispatch(updateList({ sortBy, sortDirection, filter }));
  };

  useEffect(() => {
    debounceSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, staff.sortBy, staff.sortDirection, staff.filter]);

  // useEffect(() => {
  //   const sortBy = staff.sortBy;
  //   const sortDirection = staff.sortDirection;
  //   const filter = staff.filter;
  //   updateUsersList(sortBy, sortDirection, filter);
  // }, [staff.sortBy, staff.sortDirection, staff.filter]);

  const handleChange = async (event, enums, id) => {
    const name = event.target.name;
    const value = getKey(enums, event.target.value);
    await updateFromAdmin(id, { [name]: value });
    updateUsersList(staff.sortBy, staff.sortDirection, staff.filter);
    event.stopPropagation();
  };

  const onChangeIsDev = async (event, name, value, id) => {
    await updateFromAdmin(id, { [name]: value });
    updateUsersList(staff.sortBy, staff.sortDirection, staff.filter);
    event.stopPropagation();
  };

  const onChangeSort = (sortBy, direction) => {
    const updateDirection = direction === 'straight' ? 'reverse' : 'straight';
    if (sortBy === staff.sortBy) {
      updateUsersList(staff.sortBy, updateDirection, staff.filter);
    } else {
      updateUsersList(sortBy, 'straight', staff.filter);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {Object.values(tableLabels)?.map((label) => (
              <TableCell
                onClick={() => onChangeSort(getKey(tableLabels, label), staff.sortDirection)
                }
                key={label}
              >
                <TableSortLabel
                  active={getKey(tableLabels, label) === staff.sortBy}
                  classes={{
                    icon:
                      getKey(tableLabels, label) !== staff.sortBy &&
                      'no-active',
                  }}
                  direction={
                    getKey(tableLabels, label) === staff.sortBy &&
                    staff.sortDirection === 'straight'
                      ? 'asc'
                      : 'desc'
                  }
                >
                  {label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {staff.userList?.map((user) => (
            <TableRow
              key={user.id}
              // onClick={() => history.push(routePaths.common.user.createLink(user.id))}
            >
              <TableCell
                onClick={() => history.push(routePaths.common.user.createLink(user.id))
                }
              >
                <Tooltip
                  placement='bottom-start'
                  classes={tooltipClasses}
                  title={
                    <Avatar
                      className='avatar'
                      me={false}
                      user={user}
                      size='xlg'
                    />
                  }
                >
                  <Typography>{getFullName(user, 'full')}</Typography>
                </Tooltip>
              </TableCell>

              <TableCell align='center'>
                <IconButton
                  className='staff-list__dev'
                  onClick={(event) => onChangeIsDev(event, 'isDev', !user.isDev, user.id)
                  }
                >
                  {user.isDev ? (
                    <DoneOutlinedIcon fontSize='inherit' className='dev' />
                  ) : (
                    <DoneOutlineOutlinedIcon />
                  )}
                </IconButton>
              </TableCell>

              <CustomSelect
                name='role'
                disabled={activeUser.id === user.id}
                handleChange={handleChange}
                list={userRolesRu}
                user={user}
              />

              <CustomSelect
                name='tech_role'
                disabled={false}
                handleChange={handleChange}
                list={userTechRolesRu}
                user={user}
              />

              <CustomSelect
                name='status'
                disabled={activeUser.id === user.id}
                handleChange={handleChange}
                list={userStatusesRu}
                user={user}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const tooltipClasses = { tooltip: 'transparent-background' };

const tableLabels = {
  firstName_ru: 'Имя',
  isDev: 'Разработчик',
  role: 'Роль',
  tech_role: 'Должность',
  status: 'Статус',
};

export default StaffList;
