import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import { ExtraType } from 'utils/types';

import {
  ListItemText,
  ListItem,
  Collapse,
  Typography,
  Checkbox,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const CalculateExtraListItem = (props) => {
  const [open, setOpen] = useState(false);
  const { item, handleToggleCheckboxes } = props;

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggle = useCallback(
    (e) => {
      e.stopPropagation();
      handleToggleCheckboxes(item.id);
    }, [
      handleToggleCheckboxes,
      item.id,
    ]
  );

  const hoursDiff = moment(item.end).diff(item.start, 'h');
  const minutesDiff = moment(item.end)
    .subtract(hoursDiff, 'h')
    .diff(item.start, 'm');
  const extraTime = `${hoursDiff}ч ${minutesDiff}м`;
  const extraDate = moment(item.date).format('ll');
  const title = `${extraTime} за ${extraDate}`;

  return (
    <StyledListItem key={item.id} onClick={handleClick} disableGutters button>
      <StyledListItemWrap>
        <Checkbox
          className="list__item-checkbox"
          onClick={handleToggle}
          color="primary"
          edge="start"
          checked={props.selectedItemsList.indexOf(item.id) !== -1}
          disableRipple
        />

        <ListItemText className="list__item-text" primary={title} />

        {open ? <ExpandLess /> : <ExpandMore />}
      </StyledListItemWrap>

      <StyledCollapseWrap>
        <Collapse
          in={open}
          className="list__item-collapse"
          timeout="auto"
          unmountOnExit
        >
          <Typography className="list__item-text" paragraph>
            {`Описание: ${item.description}`}
          </Typography>
        </Collapse>
      </StyledCollapseWrap>
    </StyledListItem>
  );
};

const StyledListItem = styled(ListItem)`
  && {
    padding: 10px 3px;
    border-bottom: 1px solid #ccc;
    margin: 0;
    display: block;
  }

  &:last-child {
    border-bottom: none;
  }

  &:first-child {
    margin-top: 10px;
  }

  .list__item-checkbox {
    padding: 0 5px 0 0;
  }
`;

const StyledListItemWrap = styled.div`
  display: flex;
  cursor: pointer;

  .list__item-text {
    padding: 0px;
  }
`;

const StyledCollapseWrap = styled.div`
  max-width: 350px;
  padding-left: 30px;

  .list__item-text {
    margin: 0
    padding-top: 10px;
  }
`;

CalculateExtraListItem.propTypes = {
  item: ExtraType,
  handleToggleCheckboxes: PropTypes.func,
  selectedItemsList: PropTypes.array,
};

CalculateExtraListItem.defaultProps = {
  selectedItemsList: [],
  handleToggleCheckboxes: () => null,
};

export default CalculateExtraListItem;
