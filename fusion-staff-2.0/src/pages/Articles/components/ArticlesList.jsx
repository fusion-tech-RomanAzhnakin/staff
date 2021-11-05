import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArticleCard from 'pages/Articles/components/ArticleCard';

const ArticlesList = (props) => {
  const {
    articles,
    filteredArticles,
  } = useSelector(({ articles }) => articles);

  if (!articles) {
    return null;
  }

  if (!filteredArticles?.length) {
    return <Typography variant="h3">Статьи не найдены</Typography>;
  }

  return (
    <Grid
      justify="flex-start"
      container
      spacing={3}
    >
      {filteredArticles?.map((articleId) => (
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          key={articleId}
        >
          <ArticleCard
            openConfirmModal={props.openConfirmModal}
            article={articles.get(articleId)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

ArticlesList.propTypes = {
  openConfirmModal: PropTypes.func,
};

ArticlesList.defaultProps = {
  openConfirmModal: () => null,
};

export default ArticlesList;
