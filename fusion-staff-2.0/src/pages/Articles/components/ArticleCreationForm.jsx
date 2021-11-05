/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import {
  object as yupObject,
  string as yupString,
} from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SelectWrapper from 'ui/components/SelectWrapper';
import Modal from 'ui/components/Modal';
import { anchorId } from 'ui/components/SelectAnchor';
import { CustomStyles } from 'ui/components/CustomSelectComponents';
import StyledArticleForm from 'pages/Articles/components/ArticleCreationForm.style';

import { validationErrorName } from 'utils/constants';
import { toggleLoader } from 'store/main';
import { getFilteredArticles, createArticle } from '../store/thunks';
import { selectableTags } from '../store/selectors';

const validation = yupObject().shape({
  link: yupString().url('Некорректная ссылка'),
});

const ArticleCreationForm = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const dispatch = useDispatch();
  const tags = useSelector(selectableTags);

  const toggleModalVisibility = () => {
    setIsOpenForm((isOpenForm) => !isOpenForm);
    resetForm();
  };

  const onSelectChange = (value, data) => {
    handleChange({ target: { value, name: data.name } });
  };

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    setSubmitting,
    setErrors,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      link: '',
      tags: null,
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        dispatch(toggleLoader(true));
        const existingTags = values.tags.filter((tag) => !tag.__isNew__);
        const preparedExistingTags = existingTags.map((tag) => (
          {
            id: tag.value,
          }
        ));
        const newTags = values.tags.filter((tag) => tag.__isNew__).map((newTag) => (
          {
            title: newTag.label,
          }
        ));

        const requestResult = await dispatch(createArticle({
          articleLink: values.link,
          existingTags: preparedExistingTags,
          newTags,
          onTagCreate: (selectedNewTags) => {
            const preparedTags = existingTags.concat(selectedNewTags).map((selectedTags) => ({
              value: selectedTags.id || selectedTags.value,
              label: selectedTags.title || selectedTags.label,
            }));

            setValues({
              ...values,
              tags: preparedTags,
            });
          },
        }));

        if (createArticle.fulfilled.match(requestResult)) {
          toast.success('Успех! Статья была добавлена');
          resetForm();

          dispatch(getFilteredArticles());

          toggleModalVisibility();
        } else {
          throw requestResult.payload;
        }
      } catch (err) {
        const isValidationError = err?.data?.name === validationErrorName;

        if (isValidationError) {
          return err.data.errors.forEach(({ path, message }) => {
            setErrors({ [path]: message });
          });
        }

        toast.error(`Ошибка создания статьи: ${err.data}`);
      } finally {
        setSubmitting(false);
        dispatch(toggleLoader(false));
      }
    },
  });

  return (
    <>
      <FormControlLabel
        control={
          <Tooltip title="Добавить статью" placement="top">
            <Button
              variant="contained"
              color="primary"
              fullWidth
            >
              +
            </Button>
          </Tooltip>
        }
        onClick={toggleModalVisibility}
      />

      <Modal
        open={isOpenForm}
        onClose={toggleModalVisibility}
        title="Добавить статью"
      >
        <StyledArticleForm onSubmit={handleSubmit}>
          <Grid
            container
            className="creation-form__fields"
            spacing={3}
          >
            <Grid item>
              <TextField
                id="link"
                name="link"
                label="Ссылка"
                value={values.link}
                type="text"
                error={!!errors.link}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                helperText={errors.link}
                fullWidth
              />
            </Grid>

            <Grid item>
              <SelectWrapper >
                <InputLabel className="creation-form__field-label">Теги</InputLabel>

                <CreatableSelect
                  name="tags"
                  classNamePrefix="select"
                  styles={CustomStyles}
                  placeholder=""
                  value={values.tags}
                  options={tags}
                  disabled={tags.length}
                  hideSelectedOptions
                  closeMenuOnSelect={false}
                  isClearable
                  isSearchable
                  isMulti
                  menuShouldScrollIntoView={false}
                  menuPortalTarget={document.getElementById(anchorId)}
                  onChange={onSelectChange}
                />
              </SelectWrapper>
            </Grid>

            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!values.tags?.length || !values.link}
              >
                Отправить
              </Button>
            </Grid>
          </Grid>
        </StyledArticleForm>
      </Modal>
    </>
  );
};

export default ArticleCreationForm;
