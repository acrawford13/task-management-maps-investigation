import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

import Event from './components/Event';
import Unavailability from './components/Unavailability';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  background-color: ${props => props.theme.colors.offWhite};
`;

const TimeLabel = styled.div`
  border-bottom: 1px solid black;
  display: inline-flex;
  align-items: center;
  grid-column: 1;
  min-height: 2rem;
  grid-row: ${props => props.index + 1} / span 2;
  border-right: 1px solid ${props => props.theme.colors.alto};
  justify-self: flex-end;
  padding: 0.5rem;
  font-size: 0.9rem;
`;

const TimeContainer = styled.div`
  border-bottom: 1px ${props => (props.index % 2 === 0 ? 'dashed rgba(0, 0, 0, 0.2)' : 'solid rgba(0, 0, 0, 0.4)')};
  grid-column: 2;
  min-height: 1rem;
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

const createUnavailability = ({ availability, start_time, end_time }) => {
  const tempAvailability = [...availability];
  if (availability.length === 0) {
    return [{ start_time, end_time }];
  }
  if (moment.utc(tempAvailability[0].start_time).isAfter(moment.utc(start_time))) {
    tempAvailability.unshift({ start_time, end_time: start_time });
  }
  if (moment.utc(tempAvailability[tempAvailability.length - 1].end_time).isBefore(moment.utc(end_time))) {
    tempAvailability.push({ start_time: end_time, end_time });
  }
  const unavailability = tempAvailability
    .map((available, index) => {
      if (tempAvailability[index - 1]) {
        return {
          start_time: tempAvailability[index - 1].end_time,
          end_time: available.start_time,
        };
      }
    })
    .filter(value => value);

  return unavailability;
};

const Calendar = ({ start_time, end_time, events, availability }) => {
  console.log(events);
  const options = createTimeslots({
    minDateTime: moment.utc(start_time),
    maxDateTime: moment.utc(end_time),
    timeIntervals: 30,
    timeFormat: 'HH:mm',
  });
  const unavailability = createUnavailability({ availability, start_time, end_time });
  return (
    <Wrapper>
      {unavailability.map((timeslot, index) => (
        <Unavailability key={index} {...timeslot} calendar_start_time={start_time} calendar_end_time={end_time} />
      ))}
      {options.map((option, index) => (
        <Fragment key={index}>
          {index % 2 === 0 && <TimeLabel index={index}>{option.label}</TimeLabel>}
          <TimeContainer index={index} />
        </Fragment>
      ))}
      {events.map((event, index) => (
        <Event key={index} timeFormat="HH:mm" {...event} calendar_start_time={start_time} />
      ))}
    </Wrapper>
  );
};

export default Calendar;
