import React from 'react';
import { storiesOf } from '@storybook/react';
import Marker from './Marker';

storiesOf('Atoms/Marker', module)
  .add('Default', () => <Marker status="assigned" />)
  .add('Selected', () => <Marker selected status="assigned" />)