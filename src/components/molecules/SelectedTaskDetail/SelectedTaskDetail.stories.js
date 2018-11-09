import React from 'react';
import { storiesOf } from '@storybook/react';
import SelectedTaskDetail from './SelectedTaskDetail';

storiesOf('Molecules/SelectedTaskDetail', module).add('Default', () => (
  <SelectedTaskDetail name="Greet at Hannaford St" status="not_assigned" start_time="2018-09-09T15:00:00Z" end_time="2018-09-09T15:30:00Z" />
));
