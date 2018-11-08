import React from 'react';
import { storiesOf } from '@storybook/react';
import TaskDetail from './TaskDetail';

storiesOf('Molecules/TaskDetail', module).add('Default', () => (
  <TaskDetail name="Greet at Hannaford St" start_time="2018-09-09T15:00:00Z" end_time="2018-09-09T15:30:00Z" />
));
