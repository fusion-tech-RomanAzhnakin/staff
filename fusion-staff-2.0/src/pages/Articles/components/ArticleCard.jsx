import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Chip from '@material-ui/core/Chip';
import StyledArticleCard from 'pages/Articles/components/ArticleCard.style';

import { userRoles } from 'utils/constants';
import { ArticleType } from 'utils/types';

const ArticleCard = (props) => {
  const [anchorMenuEl, setAnchorMenuEl] = useState(null);
  const user = useSelector(({ main }) => main.user);
  const tags = useSelector(({ articles }) => articles.tags);
  const { article } = props;
  const hasRemoveAbility = useMemo(() => {
    return user.role === userRoles.admin ||
      article.added_by === user.id;
  }, [user, article]);

  const toggleMenuVisibility = (event) => {
    event.preventDefault();
    setAnchorMenuEl(anchorMenuEl ? null : event.currentTarget);
  };

  const handleDeletingArticle = (event) => {
    event.preventDefault();
    props.openConfirmModal(article.id);
  };

  return (
    <StyledArticleCard
      href={article.link}
      target="_blank"
      rel="noreferrer"
      backgroundImage={article.image}
    >
      <Card className="article-card">
        <div className="article-card__wrapper">
          <CardHeader
            className="article-card__header"
            action={hasRemoveAbility && (
              <>
                <IconButton size="small" onClick={toggleMenuVisibility}>
                  <MoreHorizIcon color="primary" />
                </IconButton>

                <Menu
                  anchorEl={anchorMenuEl}
                  keepMounted
                  open={Boolean(anchorMenuEl)}
                  onClose={toggleMenuVisibility}
                >
                  <MenuItem onClick={handleDeletingArticle}>Удалить</MenuItem>
                </Menu>
              </>)
            }
            title={article.title}
          />
          <CardContent className="article-card__content">
            <Typography className="article-card__description" paragraph>
              {article.description}
            </Typography>

            <Typography className="article-card__url" color="textSecondary">
              {article.url}
            </Typography>

            <div className="article-card__tags-box">
              {tags && article.tags?.map((tag) => (
                <Chip
                  className="article-card__tag"
                  label={tags[tag.id].title}
                  key={tag.id}
                />))
              }
            </div>
          </CardContent>
        </div>
      </Card>
    </StyledArticleCard>
  );
};

ArticleCard.propTypes = {
  openConfirmModal: PropTypes.func,
  article: ArticleType.isRequired,
};

ArticleCard.defaultProps = {
  openConfirmModal: () => null,
};

export default ArticleCard;
