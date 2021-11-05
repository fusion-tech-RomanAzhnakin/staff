import React, { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  object as yupObject,
  string as yupString,
} from 'yup';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Link, Switch, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Select from 'react-select';
import { updateCandidate, createCandidate, setNewColumn, sendToArchive, updateCandidateSubscribers } from 'pages/HrBoards/store/thunks';
import { setCandidate } from 'pages/HrBoards/store/reducer';
import SelectWrapper from 'ui/components/SelectWrapper';
import { englishOptions } from 'utils/constants';
import { arrayToSelectOptions, commonOptionFormatter, userOptionFormatter } from 'utils/arrayToSelectOptions';
import { getFullName } from 'utils/utils';

import { Option, CustomValueContainer, CustomStyles } from 'ui/components/CustomSelectComponents';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateIcon from '@material-ui/icons/Create';
import ArchiveIcon from '@material-ui/icons/Archive';
// import { AvatarGroup } from '@material-ui/lab';
import { ConfirmModal } from 'ui/components/ConfirmModal';
// import Avatar from 'ui/components/Avatar';

const CandidateForm = (props) => {
  const candidate = useSelector(({ hrBoards }) => hrBoards.candidates[hrBoards.openCandidate.id]);
  const technologies = useSelector(({ enums }) => enums.technologies);
  const usersList = useSelector(({ enums }) => enums.usersList);

  const technologiesOptions = technologies.map((item) => commonOptionFormatter(item));

  const subscribersOptions = Object.values(usersList).map((user) => userOptionFormatter(user));

  const { onClose } = props;
  const [socialIsActive, setSocial] = useState(false);
  const [repoIsActive, setRepo] = useState(false);
  const [confirmIsOpen, setConfirm] = useState(false);

  const editOnClick = async (e) => {
    if (e.target.id === 'social') {
      await setSocial(!socialIsActive);
    }
    if (e.target.id === 'repo') {
      await setRepo(!repoIsActive);
    }
  };
  const getFormValues = useCallback(() => ({
    firstName: candidate?.firstName || '',
    lastName: candidate?.lastName || '',
    social: (candidate?.social || []).join(', '),
    repo: (candidate?.repo || []).join(', '),
    job_experience: candidate?.job_experience || '',
    english_level: candidate?.english_level || null,
    army: candidate?.army || false,
    studying: candidate?.studying || false,
    additional_info: candidate?.additional_info || '',
    technologies: candidate?.technologies.map((item) => ({
      label: item.title,
      value: item.id,
    })) || [],
  }), [candidate]);

  const dispatch = useDispatch();

  const handleSelect = (selected, name, setFieldValue) => {
    setFieldValue(name, selected);
  };

  const handleCheckbox = (target, setFieldValue) => {
    setFieldValue(target.name, target.checked);
  };

  const getIdsFromArrayObjects = (arr) => {
    const ids = [];
    arr.map((item) => ids.push(item.value));
    return ids;
  };

  const handleSubscribersChange = (e, selected) => {
    dispatch(updateCandidateSubscribers({
      candidate,
      candidate_id: candidate.id,
      user_id: selected.option?.value || selected.removedValue?.value,
    }));
  };

  const handleSubmit = async ({ initialValues, ...updatedField }) => {
    const values = {
      ...initialValues,
      ...updatedField,
    };

    const state = {
      firstName: values.firstName,
      lastName: values.lastName,
      job_experience: values.job_experience,
      army: values.army,
      studying: values.studying,
      additional_info: values.additional_info,
      technologies: values.technologies ? getIdsFromArrayObjects(values.technologies) : [],
      repo: values.repo.split(', '),
      social: values.social.split(', '),
      english_level: values.english_level.value,
    };

    if (!candidate?.id) {
      await dispatch(createCandidate({ state }));
    } else {
      await dispatch(updateCandidate({ candidate_id: candidate.id, state }));
    }
    dispatch(setCandidate({ id: null, isOpen: false }));
  };

  const subscribers = candidate?.subscribers;
  const subscribersValues = useMemo(
    () => (
      (subscribers || []).map((item) => (
        arrayToSelectOptions(getFullName(usersList[item.id], 'full'), item.id)
      ))
    ),
    [subscribers, usersList],
  );

  const validation = yupObject().shape({
    firstName: yupString().required('Введите полное имя'),
    lastName: yupString().required('Введите полное имя'),
  });

  return (
    <>
      <Formik
        initialValues={getFormValues()}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {({ values, setFieldTouched, setFieldValue, handleChange, errors, touched }) => (
          <CandidateFormEl>
            <div className='nameInfo'>
              <TextField
                label='Имя'
                value={values.firstName}
                name='firstName'
                onChange={handleChange}
                error={Boolean(touched.firstName && errors.firstName)}
              />

              <TextField
                label='Фамилия'
                value={values.lastName}
                name='lastName'
                onChange={handleChange}
                error={Boolean(touched.lastName && errors.lastName)}
              />

            </div>
            <div className='linksInfo'>

              <FormControl onChange={handleChange} >
                <InputLabel
                  shrink={!!values.social || socialIsActive}
                  htmlFor='social'
                >
                  Ссылки на социальные сети
                </InputLabel>
                <div className={'customInput'}>
                  {socialIsActive
                    ? <Input
                      autoFocus={socialIsActive}
                      onBlur={() => setSocial(false)}
                      className='linksInput'
                      id='social'
                      value={values.social}
                      multiline
                      rows={2}
                    />
                    : <div className='clickableLinks'>
                      {
                        values.social.split(', ').map((value, index) => (
                          <Link key={index} href={value}>{value}</Link>))
                      }
                    </div>}
                  <CreateIcon
                    className='editButton'
                    id='social'
                    fontSize='small'
                    onClick={editOnClick}
                  />
                </div>
              </FormControl>

              <FormControl onChange={handleChange} >
                <InputLabel
                  shrink={!!values.repo || repoIsActive}
                  htmlFor="repo"
                >
                  Ссылки на репозитории
                  </InputLabel>
                <div className={'customInput'}>
                  {repoIsActive
                    ? <Input
                      autoFocus={repoIsActive}
                      multiline
                      rowsMax={4}
                      onBlur={() => setRepo(false)}
                      className='linksInput'
                      id='repo'
                      value={values.repo}
                    />
                    : <div className='clickableLinks'>
                      {
                        values.repo.split(', ').map((value, index) => (
                          <Link key={index} href={value}>{`${value}\n`}</Link>))
                      }
                    </div>}
                  <CreateIcon
                    className='editButton'
                    id='repo'
                    fontSize='small'
                    onClick={editOnClick}
                  />
                </div>
              </FormControl>
            </div>
            <div className='workExperience'>
              Опыт работы:
              <TextField
                multiline
                rowsMax={4}
                value={values.job_experience}
                onChange={handleChange}
                name="job_experience"
              />

            </div>
            <div className='workLevel'>
              <div className='workLevel_lists'>
                <div>
                  <FormControlCust>
                    <SelectWrapper>
                      <Select
                        closeMenuOnSelect={false}
                        components={{ Option, ValueContainer: CustomValueContainer }}
                        placeholder='Технологии'
                        hideSelectedOptions={false}
                        isMulti
                        classNamePrefix='select'
                        name="technologies"
                        isClearable={false}
                        options={technologiesOptions}
                        value={values.technologies}
                        onChange={(value, e) => handleSelect(value, e.name, setFieldValue)}
                        onBlur={setFieldTouched}
                        styles={CustomStyles}
                      >
                      </Select>
                    </SelectWrapper>
                  </FormControlCust>
                </div>
                <div>
                  Армия:
              <Switch
                    type='checkbox'
                    name='army'
                    color='primary'
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    checked={values.army}
                    onChange={(e) => handleCheckbox(e.target, setFieldValue)}
                  />
                </div>
              </div>
              <div className='workLevel_check'>
                <div>
                  <FormControlCust>
                    <SelectWrapper>
                      <Select
                        classNamePrefix='select'
                        placeholder='Уровень английского'
                        components={{ ValueContainer: CustomValueContainer }}
                        value={englishOptions.find((item) => item.value === values.english_level)}
                        name="english_level"
                        onChange={(value, e) => handleSelect(value, e.name, setFieldValue)}
                        options={englishOptions}
                        styles={CustomStyles}
                      />
                    </SelectWrapper>
                  </FormControlCust>
                </div>
                <div>
                  Учится:
                  <Switch
                    type='checkbox'
                    name='studying'
                    color='primary'
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    checked={values.studying}
                    onChange={(e) => handleCheckbox(e.target, setFieldValue)}
                  />
                </div>
              </div>
            </div>
            <div className='addInform'>
              Дополнительная информация:
          <TextField
                multiline
                rowsMax={4}
                value={values.additional_info}
                onChange={handleChange}
                name="additional_info"
              />
            </div>
            <div className='actionButtons'>
              <div className='iconButtons'>
                {candidate && !candidate?.column_id
                  ? <AddBoxIcon
                    onClick={() => {
                      dispatch(setNewColumn({ candidate_id: candidate.id, column_id: 1 }));
                    }}
                  />
                  : ''}
                <ArchiveIcon
                  onClick={() => {
                    setConfirm(true);
                  }}
                />
              </div>
              <div className='formButtons'>
                <Button type='submit'>
                  {candidate ? 'Сохранить' : 'Создать'}
                </Button>

                <Button
                  type='button'
                  onClick={onClose}
                >
                  Отмена
              </Button>
              </div>
            </div>
            <div className='subscribers'>
              {/* <AvatarGroup max={2}>
                {candidate?.subscribers.map((value) => <Avatar
                  key={value.id}
                  user={usersList[value.id]}
                />)}
              </AvatarGroup> */}
              <div>
                <FormControlCust>
                  <SelectWrapper>
                    <Select
                      menuPlacement='top'
                      closeMenuOnSelect={false}
                      placeholder='Подписчики'
                      isMulti
                      components={{ ValueContainer: CustomValueContainer }}

                      isClearable={false}
                      hideSelectedOptions={false}
                      classNamePrefix='select'
                      options={subscribersOptions}
                      value={subscribersValues}
                      onChange={(e, value) => handleSubscribersChange(e, value)}
                      styles={CustomStyles}
                      autosize={true}
                    >
                    </Select>
                  </SelectWrapper>
                </FormControlCust>
              </div>
            </div>
          </CandidateFormEl >
        )
        }
      </Formik >
      < ConfirmModal
        open={confirmIsOpen}
        onAccept={() => {
          dispatch(sendToArchive({ candidate_id: candidate.id }));
          dispatch(setCandidate({ id: null, isOpen: false }));
        }
        }
        onClose={() => setConfirm(false)}
        title={'Переместить в архив'}
        content={'Вы уверены, что хотите переместить этого кандидата в архив?'}
      />
    </>
  );
};
const FormControlCust = styled(FormControl)`
  min-width: 100px;
  max-width: 500px;
  max-height: 300px;
`;

const CandidateFormEl = styled(Form)`
  width: 95%;
  margin: auto;
  .nameInfo{
    margin: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-left: 40px;
    div {
      width: 90%;
      padding: 5px;
    }
  }
  .linksInfo{
    margin: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-left: 40px;
    div {
      width: 90%;
      padding: 5px;
    }
  }
  .editButton{
    align-self:start;
   position: absolute;
   top: 20px;
   left: 80%; 
  }
  .customInput{
   display:flex;
   justify-content: space-between;
   width:100%;
  
  }
  .clickableInput{
    width:100%;
  }
  .clickableLinks{
    margin: 15px 0px 0px 4px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    padding-bottom: 20px;
    min-height: 1.5em;
    a{
      margin-right: 0.5em;
    }
  }
  .linksInput{
    margin-top:11px;
  }

  .linkLabel{
    font-size: 12px;
  }
  textarea{
    display: block;
    width: 100%;
    resize: none;
  } 
  .workExperience{
    width: 87%;
    margin: auto;
    display:flex;
    flex-direction: column;
  }
  .workLevel{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    margin: auto;
    &_lists{
      height: 120px;
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 50px;
      > div:first-child{
        display:flex;
        flex-direction: column;
       > div:first-child{
         width: 100%;
         display: flex;
         flex-direction: column;
        }
      }
    }
    &_check{
      height: 120px;
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 50px;
      > div:first-child{
        display:flex;
        flex-direction: column;
       > div:first-child{
         width: 100%;
         display: flex;
         flex-direction: column;
       }
      }
    }
  }
  .addInform{
    width: 87%;
    margin: auto;
    padding-top: 30px;
    display:flex;
    flex-direction: column;
  }
  .subscribers{
    padding:5%;
    display: flex;
    align-items:center;
    width: 40%;
      > div:first-child{
        width: 100%;
        > div:first-child{
        width: 100%;
      }
      }
  }
 .actionButtons{
  display: flex;
  justify-content: space-between;
  margin: 70px auto 20px auto;
 
    .iconButtons{
      display: flex;
      align-items:flex-end;
     justify-content: flex-end;
     & > svg {
      cursor:pointer;
     }
    }
    .formButtons{
      height: 35px;
      display: flex;
      justify-content: flex-end;
      button{
        width: 100px;
        height: 30px;
        border: none;
        border-radius: 5px;
        color: white;
        background-color: #939393;
        margin: 5px;
        font-size: 14px;
      }
    }
  }
  @media (max-width: 701px) {
    .nameInfo{
      display: flex;
      flex-direction: column;
      width: auto;
      margin-left: 10px;
      div {
        width: 100%;
      }
    }
    .MuiInputBase-input{
      width: 100%;
    }
    .linksInfo{
      display: flex;
      flex-direction: column;
      width: auto;
      margin-left: 10px;
      div {
        width: 100%;
      }
    }
    .workBackground{
      width: 90%;
    }
    .workLevel{
      flex-direction: column;
        &_lists{
        height: 120px;
        width: 100%;
        > div:first-child{
        display:flex;
        flex-direction: column;
       > div:first-child{
         width: 100%;
         display: flex;
         flex-direction: column;
       }
      }
    }
      &_check{
        height: 120px;
        width: 100%;
        > div:first-child{
        display:flex;
        flex-direction: column;
       > div:first-child{
         width: 100%;
         display: flex;
         flex-direction: column;
       }
      }
    }
  }
    .addInform{
      width: 90%;
    }
  }
`;

CustomValueContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  isFocused: PropTypes.bool,
  selectProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

CustomValueContainer.defaultProps = {
  isFocused: false,
};
CandidateForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
Option.propTypes = {
  isSelected: PropTypes.bool,
  value: PropTypes.number.isRequired,
};
Option.defaultProps = {
  isSelected: false,
};

export default CandidateForm;
