import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import ArticleCreationForm from 'pages/Articles/components/ArticleCreationForm';
import SelectWrapper from 'ui/components/SelectWrapper';
import { CustomStyles } from 'ui/components/CustomSelectComponents';
import StyledArticleFiltration, { FiltrationGridItem } from 'pages/Articles/components/ArticleFiltration.style';

import useDebouncedFunction from 'utils/hooks/useDebouncedFunction';
import { selectableDevUsers } from 'store/enums/selectors';
import { selectableTags } from '../store/selectors';
import { getFilteredArticles } from '../store/thunks';
import { setFilters, clearFilters, setFilteredArticles } from '../store/reducer';

const selectableTypes = {
  tags: 'tags',
  users: 'users',
};

const ArticleFiltration = () => {
  const [isOpenFiltration, setIsOpenFiltration] = useState(true);
  const articlesState = useSelector(({ articles }) => articles);
  const dispatch = useDispatch();
  const tags = useSelector(selectableTags);
  const users = useSelector(selectableDevUsers);
  const isNotEmptyFilters = useMemo(() => {
    return articlesState.filters.title ||
      articlesState.filters.users?.length ||
      articlesState.filters.tags?.length;
  }, [articlesState.filters]);
  const getArticlesByFilters = useRef(useDebouncedFunction(
    () => dispatch(getFilteredArticles()),
    500,
    true,
  ));

  const handleSelect = (values, actionType) => {
    const preparedValues = values || [];

    switch (actionType) {
      case selectableTypes.users:
        dispatch(setFilters({ users: preparedValues }));
        break;

      case selectableTypes.tags:
        dispatch(setFilters({ tags: preparedValues }));
        break;

      default:
        break;
    }
  };

  const toggleFiltrationVisibility = () => {
    setIsOpenFiltration((isOpenedFiltration) => !isOpenedFiltration);
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
  };

  const handleInput = (event) => {
    dispatch(setFilters({ title: event.target.value }));
  };

  useEffect(() => {
    if (isNotEmptyFilters) {
      return getArticlesByFilters.current();
    }

    dispatch(setFilteredArticles(articlesState.articles
      ? Array.from(articlesState.articles.keys()) : []));
  }, [
    dispatch,
    articlesState.filters,
    isNotEmptyFilters,
    getArticlesByFilters,
    articlesState.articles,
  ]);

  useEffect(() => {
    return () => dispatch(clearFilters());
  }, [dispatch]);

  return (
    <StyledArticleFiltration>
      <div className="filtration__actions-box">
        <FormControlLabel
          className="filtration__control-label"
          control={<FilterListIcon color={isOpenFiltration ? 'primary' : 'inherit'} />}
          onClick={toggleFiltrationVisibility}
          label="Фильтры"
        />

        <ArticleCreationForm />
      </div>

      <Collapse in={isOpenFiltration}>
        <Grid
          container
          className="filtration__filters-grid"
          spacing={2}
          justify='space-between'
          alignItems='center'
        >
          <FiltrationGridItem>
            <TextField
              id="title"
              name="title"
              label="Название"
              value={articlesState.filters.title}
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleInput}
            />
          </FiltrationGridItem>

          <FiltrationGridItem>
            <SelectWrapper>
              <InputLabel className="filtration__field-label">Кем создано</InputLabel>

              <Select
                name={selectableTypes.users}
                classNamePrefix="select"
                styles={CustomStyles}
                placeholder=""
                value={articlesState.filters.users}
                options={users}
                hideSelectedOptions
                isClearable
                closeMenuOnSelect={false}
                disabled={users.length}
                isMulti
                onChange={(selectedValues) => handleSelect(selectedValues, selectableTypes.users)}
              />
            </SelectWrapper>
          </FiltrationGridItem>

          <FiltrationGridItem>
            <SelectWrapper>
              <InputLabel className="filtration__field-label">Теги</InputLabel>

              <Select
                name={selectableTypes.tags}
                classNamePrefix="select"
                styles={CustomStyles}
                placeholder=""
                value={articlesState.filters.tags}
                options={tags}
                hideSelectedOptions
                isClearable
                closeMenuOnSelect={false}
                disabled={tags.length}
                isMulti
                onChange={(selectedValues) => handleSelect(selectedValues, selectableTypes.tags)}
              />
            </SelectWrapper>
          </FiltrationGridItem>

          <Divider className="filtration__divider" light />

          <Grid
            container
            className="filtration__cta-wrapper"
            justify="flex-end"
          >
            <Grid item xs={12} md={6} lg={4}>
              <Button
                variant="contained"
                fullWidth
                disabled={!isNotEmptyFilters}
                onClick={clearAllFilters}
              >
                Очистить фильтр
              </Button>
            </Grid>
          </Grid>
        </Grid >
      </Collapse>
    </StyledArticleFiltration>
  );
};

export default ArticleFiltration;
