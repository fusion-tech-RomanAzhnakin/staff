import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dateFnsAdd from 'date-fns/add';
import dateFnsSub from 'date-fns/sub';

import Timeline from 'react-calendar-timeline';
import Marker from './components/Marker';
import DeveloperItem from './components/DeveloperItem';
import TimelineItem from './components/TimelineItem';
import StyledErpDiagram from './ErpDiagram.style';

import { getData } from './store/thunks';

const ErpDiagram = () => {
  const dispatch = useDispatch();
  const { devs, requests, jobs } = useSelector(({ erpDiagram }) => ({
    devs: erpDiagram.devs,
    users: erpDiagram.users,
    requests: erpDiagram.requests,
    jobs: erpDiagram.jobs,
  }));

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const items = useMemo(() => {
    if (!requests || !jobs) { return null; }

    const itemsList = [...requests, ...jobs];

    return itemsList;
  }, [requests, jobs]);

  if (!devs || !items) { return null; }

  return (
    <StyledErpDiagram>
      <Timeline
        groups={devs}
        items={items}
        groupRenderer={DeveloperItem}
        itemRenderer={TimelineItem}
        stackItems
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        defaultZoom={MONTH * 2}
        minZoom={WEEK * 2}
        maxZoom={YEAR}
        sidebarWidth={230}
        lineHeight={40}
        canMove={false}
      >
        <Marker />
      </Timeline>
    </StyledErpDiagram>
  );
};

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = WEEK * 4;
const YEAR = DAY * 365;

const defaultTimeStart = +dateFnsSub(new Date(), { days: 25 });
const defaultTimeEnd = +dateFnsAdd(new Date(), { days: 60 });

export default ErpDiagram;
