import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

import Event from './components/Event';
import Unavailability from './components/Unavailability';
import { createUnavailability } from 'utils/calendar';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  background-color: ${props => props.theme.colors.offWhite};
`;

const TimeLabel = styled.div`
  border-top: 1px solid black;
  display: inline-flex;
  align-items: center;
  grid-column: 1;
  min-height: 2rem;
  grid-row: ${props => props.index + 1} / span ${props => 60 / props.timeIntervals};
  border-right: 1px solid ${props => props.theme.colors.alto};
  justify-self: flex-end;
  padding: 0.5rem;
  font-size: 0.9rem;
`;

const TimeContainer = styled.div`
  /* border-bottom: 1px
    ${props =>
      props.index % (60 / props.timeIntervals) === 0 ? 'dashed rgba(0, 0, 0, 0.2)' : 'solid rgba(0, 0, 0, 0.4)'}; */
  border-top: 1px
    ${props => (props.border === 1 ? 'dashed rgba(0, 0, 0, 0.2)' : props.border === 0 && 'solid rgba(0, 0, 0, 0.4)')};
  grid-column: 2 / -1;
  min-height: ${props => 50 / (60 / props.timeIntervals)}px;
  grid-row: ${props => props.index + 1};
`;

const createTimeslot = ({ option, baseDate, timeFormat }) => ({
  label: option.format(timeFormat),
  value: option
    .clone()
    .utc()
    .format(),
  dayOffset: option
    .clone()
    .startOf('day')
    .diff(baseDate, 'days'),
  moment: option.clone(),
});

const createTimeslots = ({ minDateTime, maxDateTime, timeIntervals, timeFormat }) => {
  const baseDate = minDateTime.clone().startOf('day');
  const options = [];
  for (let option = minDateTime.clone(); option < maxDateTime; option.add(timeIntervals, 'minutes')) {
    options.push(createTimeslot({ option, baseDate, timeFormat }));
  }

  return options;
};

const Calendar = ({
  handleEventClick,
  start_time,
  end_time,
  events,
  availability,
  unavailability = createUnavailability({ availability, start_time, end_time }),
  timeIntervals = 30,
}) => {
  const options = createTimeslots({
    minDateTime: moment.utc(start_time),
    maxDateTime: moment.utc(end_time),
    timeIntervals,
    timeFormat: 'HH:mm',
  });
  return (
    <Wrapper>
      {unavailability.map((timeslot, index) => (
        <Unavailability
          timeIntervals={timeIntervals}
          key={index}
          {...timeslot}
          calendar_start_time={start_time}
          calendar_end_time={end_time}
        />
      ))}
      {options.map((option, index) => (
        <Fragment key={index}>
          {index % (60 / timeIntervals) === 0 && (
            <TimeLabel timeIntervals={timeIntervals} index={index}>
              {option.label}
            </TimeLabel>
          )}
          <TimeContainer
            border={(index % (60 / timeIntervals)) / (30 / timeIntervals)}
            timeIntervals={timeIntervals}
            index={index}
          />
        </Fragment>
      ))}
      {events.map((event, index) => (
        <Event
          key={index}
          onClick={() => handleEventClick(event)}
          timeFormat="HH:mm"
          {...event}
          timeIntervals={timeIntervals}
          calendar_start_time={start_time}
        />
      ))}
    </Wrapper>
  );
};

export default Calendar;
