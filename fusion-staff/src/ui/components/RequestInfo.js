import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

class RequestInfo extends Component {
  render() {
    const {
      request: { title, comment, deniedComment, isUnpaid, is_unpaid, willCompensateHours },
      date,
      type
    } = this.props;
    return (
      <>
        <Typography gutterBottom noWrap>
          <b>Тип заявки: </b>
          {`${type}.`}
        </Typography>
        {type === 'отпуск' && (
          <Typography>
            <b>Тип отпуска: </b>
            {`${isUnpaid ?? is_unpaid ? 'Неоплачиваемый' : 'Оплачиваемый'}`}
          </Typography>
        )}
        <Typography gutterBottom noWrap>
          <b>Заголовок: </b>
          {`${title}.`}
        </Typography>

        <Typography gutterBottom noWrap>
          <b>Когда: </b>
          {`${date}.`}
        </Typography>

        {comment !== '' && (
          <>
            <Typography gutterBottom noWrap style={style}>
              <b>Комментарий: </b>
            </Typography>

            <Typography gutterBottom style={style}>
              {comment}
            </Typography>
          </>
        )}

        {type === 'отгул' && (
          <Typography gutterBottom noWrap>
            <b>Отработка: </b>
            {willCompensateHours ? 'Да' : 'Нет'}
          </Typography>
        )}

        {deniedComment && (
          <Typography gutterBottom style={style}>
            <b>Причина отказа: </b>
            {deniedComment}
          </Typography>
        )}
      </>
    );
  }
}

const style = {
  wordBreak: 'break-all',
  maxWidth: '100%'
};

RequestInfo.propTypes = {
  request: PropTypes.objectOf(PropTypes.any).isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default RequestInfo;
