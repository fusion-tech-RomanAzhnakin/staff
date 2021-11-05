import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import MainPageContent from 'ui/components/MainPageContent';
import ConfirmModal from 'ui/components/ConfirmModal';
import ArticlesList from './components/ArticlesList';
import ArticleFiltration from './components/ArticleFiltration';

import { getTags, getArticles, deleteArticle } from './store/thunks';

const Articles = () => {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [articleId, setArticleId] = useState(null);
  const dispatch = useDispatch();

  const openConfirmModal = (articleId) => {
    setIsOpenConfirmModal(true);
    setArticleId(articleId);
  };

  const closeModal = () => {
    setIsOpenConfirmModal(false);
  };

  const handleModalAccept = () => {
    dispatch(deleteArticle(articleId));
    closeModal();
  };

  useEffect(() => {
    dispatch(getTags());
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <MainPageContent>
      <ArticleFiltration />

      <ArticlesList openConfirmModal={openConfirmModal} />

      <ConfirmModal
        open={isOpenConfirmModal}
        title="Удалить статью"
        content="Вы действительно хотите удалить эту статью?"
        onClose={closeModal}
        onAccept={handleModalAccept}
      />
    </MainPageContent>
  );
};

export default Articles;
