import React from 'react';
import { storiesOf } from '@storybook/react';
import MapMarkerCluster from './components/Cluster';
import styled from 'styled-components';

const marker1 = { task: { id: 1, start_time: '2018-11-11T09:00', status: 'not_assigned' }, fade: false, selected: false, paths: [] };
const marker2 = { task: { id: 2, start_time: '2018-11-11T10:00', status: 'not_assigned' }, fade: false, selected: false, paths: [] };
const marker3 = { task: { id: 3, start_time: '2018-11-11T11:00', status: 'not_assigned' }, fade: false, selected: false, paths: [] };
const marker4 = { task: { id: 4, start_time: '2018-11-11T12:00', status: 'not_assigned' }, fade: false, selected: false, paths: [] };
const marker5 = { task: { id: 5, start_time: '2018-11-11T13:00', status: 'not_assigned' }, fade: false, selected: false, paths: [] };

const Container = styled.div`
  margin-top: 100px;
  text-align: center;
`;

storiesOf('Molecules/MapMarkerCluster', module)
  .add('One marker', () => (
    <Container>
      <MapMarkerCluster markers={[marker1]} />
    </Container>
  ))
  .add('Multiple markers', () => (
    <Container>
      <MapMarkerCluster markers={[marker1, marker2]} />
    </Container>
  ))
  .add('3 markers', () => (
    <Container>
      <MapMarkerCluster markers={[marker1, marker2, marker3, marker4, marker5].map(marker => ({...marker, fade: true}))} />
    </Container>
  ));
