import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';

const UserInfoRow = (props) => {
  const content = useMemo(() => {
    if (props.children) {
      return props.children;
    }

    if (props.isLink) {
      return (
        <a className="user-info__link" href={props.href}>
          <Typography>{props.value}</Typography>
        </a>
      );
    }

    if (props.isMarkdown) {
      return <ReactMarkdown source={props.value} allowDangerousHtml />;
    }

    return <Typography>{props.value}</Typography>;
  }, [props]);

  return (
    <>
      <Typography variant="h2" className="user-info__label">{props.label}:</Typography>

      {content}
    </>
  );
};

UserInfoRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  isMarkdown: PropTypes.bool,
  isLink: PropTypes.bool,
  href: PropTypes.string,
  children: PropTypes.node,
};

UserInfoRow.defaultProps = {
  label: '',
  value: '',
  isMarkdown: false,
  isLink: false,
  href: '',
  children: null,
};

export default UserInfoRow;
