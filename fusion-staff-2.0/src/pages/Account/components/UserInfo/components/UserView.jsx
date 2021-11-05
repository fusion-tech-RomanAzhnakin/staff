import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import format from 'date-fns/format';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserInfoRow from 'pages/Account/components/UserInfo/components/UserInfoRow';

import { getDistanceToNow } from 'utils';

const EMPTY_VALUE_PLUG = 'Не указан';

const UserView = (props) => {
  const user = useSelector(({ userAccount }) => userAccount.user);
  const userMain = useSelector(({ main }) => main.user);
  const isOwner = user.id === userMain.id;
  const createdAt = useMemo(() => {
    return getDistanceToNow(new Date(user.createdAt));
  }, [user.createdAt]);

  return (
    <>
      <div className="user-info">
        <UserInfoRow
          label="Логин"
          value={user.login}
        />

        <UserInfoRow
          label="Имя"
          value={`${user.firstName_ru || EMPTY_VALUE_PLUG} / ${user.firstName || EMPTY_VALUE_PLUG}`}
        />

        <UserInfoRow
          label="Фамилия"
          value={`${user.lastName_ru || EMPTY_VALUE_PLUG} / ${user.lastName || EMPTY_VALUE_PLUG}`}
        />

        <UserInfoRow
          label="Телефон"
          isLink
          value={user.phone}
          href={`tel:${user.phone}`}
        />

        <UserInfoRow
          label="Email"
          isLink
          value={user.email}
          href={`mailto:${user.email}`}
        />

        <UserInfoRow
          label="Дата рождения"
          value={user.DoB ? moment(user.DoB).format('DD MMMM YYYY') : null}
        />

        <UserInfoRow label="Репозитории">
          <nav>
            {user.repo?.map((item) => (
              <li className="user-info__repo user-info__url" key={item}>
                <a href={item} target="_blank" rel="noopener noreferrer">
                  <Typography>
                    {item}
                  </Typography>
                </a>
              </li>
            ))}
          </nav>
        </UserInfoRow>

        <UserInfoRow
          label="Образование (ru)"
          isMarkdown
          value={user.education_ru}
        />

        <UserInfoRow
          label="Образование (en)"
          isMarkdown
          value={user.education}
        />

        <UserInfoRow
          label="В компании"
          value={`${createdAt} с (${format(new Date(user.createdAt), 'dd.MM.yyyy')})`}
        />

      </div>
      {isOwner && (
        <Button className="user-form__button" variant="contained" onClick={props.toggleEdit}>
          Редактировать
        </Button>
      )}
    </>
  );
};

UserView.propTypes = {
  toggleEdit: PropTypes.func,
};

UserView.defaultProps = {
  toggleEdit: null,
};

export default UserView;
