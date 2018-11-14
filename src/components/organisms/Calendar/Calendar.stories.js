import React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from './Calendar';

storiesOf('Organisms/Calendar', module)
  .add('Default', () => (
    <Calendar
      events={[
        { name: 'Cleaning at Hannaford St', start_time: '2018-11-09T11:30:00Z', end_time: '2018-11-09T12:00:00Z' },
        { name: 'Cleaning at Watson', start_time: '2018-11-09T13:30:00Z', end_time: '2018-11-09T15:00:00Z' },
      ]}
      availability={[{ start_time: '2018-11-09T07:30:00Z', end_time: '2018-11-09T15:00:00Z' }]}
      start_time="2018-11-09T07:00:00Z"
      end_time="2018-11-09T19:00:00Z"
    />
  ))
  .add('Custom Intervals', () => (
    <Calendar
      events={[
        { name: 'Cleaning at Hannaford St', start_time: '2018-11-09T11:20:00Z', end_time: '2018-11-09T12:00:00Z' },
        { name: 'Cleaning at Watson', start_time: '2018-11-09T13:30:00Z', end_time: '2018-11-09T15:00:00Z' },
      ]}
      availability={[{ start_time: '2018-11-09T07:30:00Z', end_time: '2018-11-09T15:00:00Z' }]}
      start_time="2018-11-09T07:00:00Z"
      end_time="2018-11-09T19:00:00Z"
      timeIntervals={5}
    />
  ))
  .add('Unavailable', () => (
    <Calendar
      events={[
        { name: 'Cleaning at Hannaford St', start_time: '2018-11-09T11:30:00Z', end_time: '2018-11-09T12:00:00Z' },
        { name: 'Cleaning at Watson', start_time: '2018-11-09T13:30:00Z', end_time: '2018-11-09T15:00:00Z' },
      ]}
      availability={[]}
      start_time="2018-11-09T07:00:00Z"
      end_time="2018-11-09T19:00:00Z"
    />
  ));
