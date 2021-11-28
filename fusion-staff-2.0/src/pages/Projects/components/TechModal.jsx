import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  TextField,
  Collapse,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

import DeleteIcon from '@material-ui/icons/Delete';

import styled from 'styled-components';
import projectApi from 'api/projectApi';
import { setGroupsTech } from '../store/reducer';

// import StyledModal from './StyledModal';
// import GroupItem from './GroupItem';
// import TechItem from './TechItem';

const TechModal = (props) => {
  const dispatch = useDispatch();
  const { technologies } = useSelector((store) => store.enums);
  const { groupsTech } = useSelector((store) => store.projects);
  const { onClose, open } = props;

  const [collapseTech, setCollapse] = useState(false);
  const toggleCollapse = () => setCollapse((prev) => !prev);

  const [tabIndex, setTabIndex] = useState(0);
  const onTabIndexChange = (ev, tabIndex) => {
    setTabIndex(tabIndex);
  };

  const [editedId, setEditedId] = useState(null);

  useEffect(() => {
    async function fetchTechGroups() {
      try {
        const { data: payload } = await projectApi.getTech();
        // const group = groupsTech;
        // setGroups(group);
        // const payload = groups;
        dispatch(setGroupsTech(payload));
      } catch (err) {
        // setGroups(null);
        dispatch(setGroupsTech(null));
      }
    }
    fetchTechGroups();
  }, [dispatch]);

  // const handleDeleteTech = (id) => {
  //   console.log(id);
  // };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
    // fullWidth
    // maxWidth="xs"
    >
      <div className="modal-papper">
        <h1 className="modal-title">Технологии</h1>

        <Button color="primary" onClick={toggleCollapse}>
          Создать
        </Button>

        <Collapse in={collapseTech}>
          <Tabs
            value={tabIndex}
            onChange={onTabIndexChange}
            indicatorColor="primary"
            textColor="primary"
            className="form-tabs"
            variant="fullWidth"
          >
            <Tab label="Технологию" />
            <Tab label="Группу" />
          </Tabs>

          <div
            // ref={this.form}
            className={`form ${tabIndex === 0 ? 'form--tech' : 'form--group'}`}
          >
            <TextField
              variant="outlined"
              // value={title}
              value=''
              // onChange={this.onInputChange}
              label={`Заголовок ${tabIndex === 0 ? 'технологии' : 'группы'}`}
            // className="title-input"
            />

            {tabIndex !== 0 ? null : (
              <Select
                // options={groupOptions}
                // value={selectedGroup}
                value=''
                // onChange={this.onSelectedGroupChange}
                classNamePrefix="tech-group-select"
                className="select-srapper"
                isClearable
              />
            )}

            <Button
              color="primary"
              // onClick={onSubmit}
              className="submit-button"
            >
              {editedId ? 'Изменить' : 'Создать'}
            </Button>
          </div>
        </Collapse>

        <List >
          {groupsTech && groupsTech.map((value) => (
            <ListItem className='list-item'
              key={value.id}
              // secondaryAction={
              //   <IconButton edge="end" aria-label="delete"
              //     size="small"
              //   >
              //     <DeleteIcon color="primary" onClick={() => handleDeleteTech(value.id)} />
              //   </IconButton>
              // }
            >
              <ListItemText primary={value.title} />
              {/* <div> */}
                <List component="div" >
                  {value.technologies && value.technologies.map((item) => (
                    <ListItem
                      key={item.id}
                      // secondaryAction={
                      //   <IconButton edge="end" aria-label="delete"
                      //     size="small"
                      //     color="primary"
                      //   >
                      //    <DeleteIcon color="primary" onClick={() => handleDeleteTech(item.id)} />
                      //   </IconButton>
                      // }
                    >
                      <ListItemText primary={item.title} />
                    </ListItem>
                  ))}
                </List>
              {/* </div> */}
            </ListItem>
          ))}
        </List>

      </div>
    </StyledModal>
  );
  // }
};

TechModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

TechModal.defaultProps = {
  open: false,
  onClose: () => null,
};

const StyledModal = styled(Modal)`
  .modal-papper {
    padding: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 95%;
    background-color: ${({ theme }) => theme.colors.pageBackground};
    border: 2px solid #000;
    box-shadow: 24;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow:scroll;
    overflow-x:hidden;
  }

  .modal-title {
    text-align: center;
  }

  .modal-list {
    overflow: auto;
  }

  .list-item {
    display: flex;
    flex-direction: column;
  }

  .form-tabs {
    margin-top: 20px;
  }

  .form {
    display: grid;
    padding-top: 20px;
    grid-gap: 15px;
    grid-template-columns: 1fr 1fr auto;
    grid-template-areas: 'title select button';

    &--group {
      grid-template-areas: 'title title button';
    }
  }

  /* .title-input {
    grid-area: title;

    input {
      text-align: left;
    }
    label {
      transform: translate(14px, 10px) scale(1);
    }
  } */

  .select-wrapper {
    grid-area: select;
  }

  .tech-group-select {
    &__control {
      height: 100%;
      box-shadow: none;
      border-color: rgba(0, 0, 0, 0.23);
      cursor: pointer;

      :hover {
        border-color: rgba(0, 0, 0, 0.23);
      }
    }

    &__option {
      cursor: pointer;
    }
  }

  .submit-button {
    /* grid-area: button; */
    min-width: 100px;

    :hover {
      background-color: rgba(68, 157, 68, 0.6);
    }
  }

  .tech-group {
    list-style: none;
    padding: 0;
  }

  .edit-icon {
    margin-left: 15px;
    opacity: 0;
    transition: 0.1s;
  }

  .delete-icon {
    float: right;
    margin-right: 10px;
  }

  h4:hover,
  li:hover {
    .edit-icon {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    .form--tech {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-areas: 'title' 'select' 'button';
    }

    .form--group {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas: 'title' 'button';
    }
  }
`;

export default TechModal;
