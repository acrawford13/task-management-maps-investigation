import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: ${props => props.rowOffset} / span ${props => props.rowSpan};
  background-color: ${props => props.theme.colors.transparentBittersweet};
  background: linear-gradient(
      to left top,
      transparent 0%,
      transparent calc(50% - 1px),
      rgba(0, 0, 0, 0.4) 50%,
      transparent calc(50% + 1px),
      transparent
    )
    ${props => props.theme.colors.transparentBittersweet};
`;

const Unavailability = ({ calendar_start_time, start_time, end_time }) => {
  const start = moment.utc(start_time);
  const calendarStart = moment.utc(calendar_start_time);
  const end = moment.utc(end_time);
  const duration = end.diff(start, 'minutes');
  const offset = start.diff(calendarStart, 'minutes');
  return <Wrapper rowSpan={duration / 30} rowOffset={offset / 30 + 1} />;
};

export default Unavailability;
