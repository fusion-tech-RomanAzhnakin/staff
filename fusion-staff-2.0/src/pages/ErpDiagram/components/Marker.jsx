import React from 'react';

import { TimelineMarkers, TodayMarker } from 'react-calendar-timeline';

import theme from '../../../ui/styles/StyledComponentsTheme/themes/main';

const Marker = () => {
  return (
    <TimelineMarkers>
      <TodayMarker>
        {({ styles }) => (
          <div
            style={{
              ...styles,
              backgroundColor: theme.colors.error.main,
              width: '3px',
              zIndex: 100,
            }}
          />
        )}
      </TodayMarker>
    </TimelineMarkers>
  );
};

export default Marker;
