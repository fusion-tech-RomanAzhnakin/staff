import { createSelector } from 'reselect';

const getTags = ({ articles }) => articles.tags;

export const selectableTags = createSelector(
  [getTags],
  (tags) => {
    if (!tags) {
      return [];
    }

    return Object.values(tags).map((tag) => (
      {
        value: tag.id,
        label: tag.title,
      }
    ));
  },
);
