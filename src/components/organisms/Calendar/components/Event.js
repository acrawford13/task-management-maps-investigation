import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: ${props => props.rowOffset} / span ${props => props.rowSpan};
  background-color: ${props => (props.assigning ? 'rgba(255, 255, 255, 0.5)' : props.theme.colors.yellowOrange)};
  color: ${props => (props.assigning ? props.theme.colors.oxfordBlue : 'white')};
  border: ${props => props.assigning && `1px dashed ${props.theme.colors.oxfordBlue}`};
  cursor: pointer;
  padding: 0.25rem;
  margin-top: 1px;
  font-size: 0.8rem;
`;

const Time = styled.div``;

const Title = styled.div``;

const Event = ({ calendar_start_time, name, start_time, end_time, timeFormat, assigning, onClick, timeIntervals }) => {
  const start = moment.utc(start_time);
  const calendarStart = moment.utc(calendar_start_time);
  const end = moment.utc(end_time);
  const duration = end.diff(start, 'minutes');
  const offset = start.diff(calendarStart, 'minutes');
  return (
    <Wrapper
      onClick={assigning ? null : onClick}
      assigning={assigning}
      rowSpan={duration / timeIntervals}
      rowOffset={offset / timeIntervals + 1}
    >
      <Time>
        {start.format(timeFormat)} - {end.format(timeFormat)}
      </Time>
      <Title>{name}</Title>
    </Wrapper>
  );
};

export default Event;
