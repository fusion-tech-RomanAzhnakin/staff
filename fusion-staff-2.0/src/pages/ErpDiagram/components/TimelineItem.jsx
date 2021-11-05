/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import StyledTimelineItem from './TimelineItem.style';

import { UserType } from '../../../utils/types';
import config from '../../../config';
import Avatar from '../../../ui/components/Avatar';

const TimelineItem = (props) => {
  const itemProps = props.getItemProps();
  delete itemProps.style.color;
  delete itemProps.style.background;
  delete itemProps.style.border;

  const handleClick = () => {
    if (props.item.type !== 'job') { return; }

    window.open(`${config.crmUrl}/contracts?open=${props.item.job.id}`, '_blank');
  };

  return (
    <StyledTimelineItem
      {...itemProps}
      backgroundColor={props.item.backgroundColor}
      onClick={handleClick}
      title={props.item.tooltip}
    >
      {props.item.job?.manager && (
        <Avatar
          user={props.item.job.manager}
          size="sm"
          className="pm-avatar"
          linkToAccount
          onClick={(ev) => ev.stopPropagation()}
        />
      )}
      <p className="item-title">
        {props.item.title}
      </p>
    </StyledTimelineItem>
  );
};

TimelineItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    group: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    backgroundColor: PropTypes.string,
    start_time: PropTypes.number,
    end_time: PropTypes.number,
    type: PropTypes.oneOf(['request', 'job']),
    request: PropTypes.object,
    job: PropTypes.object,
  }).isRequired,
  timelineContext: PropTypes.shape({
    timelineWidth: PropTypes.number,
    visibleTimeStart: PropTypes.number,
    visibleTimeEnd: PropTypes.number,
    canvasTimeStart: PropTypes.number,
    canvasTimeEnd: PropTypes.number,
  }).isRequired,
  itemContext: PropTypes.shape({
    dimensions: {
      left: PropTypes.number,
      width: PropTypes.number,
      collisionLeft: PropTypes.number,
      collisionWidth: PropTypes.number,
      top: PropTypes.number,
      order: {
        index: PropTypes.number,
        group: UserType,
      },
      stack: PropTypes.bool,
      height: PropTypes.number,
    },
    useResizeHandle: PropTypes.bool,
    title: PropTypes.string,
    canMove: PropTypes.bool,
    canResizeLeft: PropTypes.bool,
    canResizeRight: PropTypes.bool,
    selected: PropTypes.bool,
    width: PropTypes.number,
  }).isRequired,
  getItemProps: PropTypes.func.isRequired,
};

export default TimelineItem;
