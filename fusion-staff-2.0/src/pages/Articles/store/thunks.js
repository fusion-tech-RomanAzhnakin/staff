import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import articlesApi from 'api/articlesApi';
import tagsApi from 'api/tagsApi';
import { setTags, setArticles, setFilteredArticles } from './reducer';

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async (args, { dispatch }) => {
    try {
      const query = {
        sortBy: 'id',
        sortDirection: 'reverse',
      };

      const articles = await articlesApi.getList(query);

      const formattedArticles = new Map();

      articles.forEach((article) => {
        formattedArticles.set(article.id, article);
      });

      const articlesId = Array.from(formattedArticles.keys());

      dispatch(setArticles(formattedArticles));
      dispatch(setFilteredArticles(articlesId));
    } catch (err) {
      toast.error(`Не удалось получить статьи: ${err.data}`);
    }
  },
);

export const getFilteredArticles = createAsyncThunk(
  'articles/getFilteredArticles',
  async (args, { getState, dispatch }) => {
    try {
      const { filters } = getState().articles;
      const query = {
        sortBy: 'id',
        sortDirection: 'reverse',
        filter: {
          search: filters.title,
          added_by: filters.users.map((user) => user.value),
          tags_id: filters.tags.map((tag) => tag.value),
        },
      };
      const articles = await articlesApi.getFilteredList(query);

      const formattedArticles = articles.map((article) => article.id);

      dispatch(setFilteredArticles(formattedArticles));
    } catch (err) {
      toast.error(`Не удалось отфильтровать статьи: ${err.data}`);
    }
  },
);

export const getTags = createAsyncThunk(
  'articles/getArticlesTags',
  async (args, { dispatch }) => {
    try {
      const data = await tagsApi.getList();
      const formattedTags = {};
      data.forEach((tag) => {
        formattedTags[tag.id] = {
          ...tag,
          value: tag.id,
          label: tag.title,
        };
      });
      dispatch(setTags(formattedTags));
    } catch (err) {
      toast.error(`Не удалось получить теги: ${err.data}`);
    }
  },
);

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const { newTags, articleLink, existingTags, onTagCreate } = data;
      const { tags, articles } = getState().articles;
      const updatedArticles = new Map(articles);

      const tagsId = [];
      let createdTags = [];

      if (newTags.length) {
        const promises = [];

        newTags.forEach((newTag) => {
          promises.push(tagsApi.create(newTag));
        });

        createdTags = await Promise.all(promises);

        const formattedCreatedTags = {};
        createdTags.forEach((createdTag) => {
          formattedCreatedTags[createdTag.id] = createdTag;
        });

        dispatch(setTags({
          ...tags,
          ...formattedCreatedTags,
        }));

        onTagCreate(Object.values(formattedCreatedTags));
      }

      const articleTags = [...existingTags, ...createdTags];

      const preparedArticlesTags = [];

      articleTags.forEach((articleTag) => {
        tagsId.push(articleTag.id);
        preparedArticlesTags.push({ id: articleTag.id });
      });

      const article = await articlesApi.create({
        link: articleLink,
        tags: tagsId,
      });

      updatedArticles.set(article.id, {
        ...article,
        tags: preparedArticlesTags,
      });

      dispatch(setArticles(updatedArticles));
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (articleId, { getState, dispatch }) => {
    try {
      const { articles, filteredArticles } = getState().articles;
      const updatedArticles = new Map(articles);

      await articlesApi.deleteOne(articleId);

      const newFilteredArticles = filteredArticles.filter((article) => article !== articleId);
      updatedArticles.delete(articleId);

      dispatch(setFilteredArticles(newFilteredArticles));
      dispatch(setArticles(updatedArticles));
    } catch (err) {
      toast.error(`Не удалось удалить статью: ${err.data}`);
    }
  },
);
