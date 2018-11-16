import React from 'react';
import styled from 'styled-components';

import Marker from 'components/atoms/Marker/Marker';

export const Wrapper = styled.div`
  transform-origin: bottom center;
  transition: transform 0.25s linear;
  grid-row: 1 / 1;
  grid-column: 1 / 1;

  &:nth-of-type(1) {
    z-index: ${props => (props.fade ? 5 : 10)};
    transform: translate(${0 * 8}px, 0);
  }
  &:nth-of-type(2) {
    z-index: ${props => (props.fade ? 4 : 9)};
    transform: translate(${1 * 8}px, 0);
  }
  &:nth-of-type(3) {
    z-index: ${props => (props.fade ? 3 : 8)};
    transform: translate(${2 * 8}px, 0);
  }
  &:nth-of-type(4) {
    z-index: ${props => (props.fade ? 2 : 7)};
    transform: translate(${3 * 8}px, 0);
  }
  &:nth-of-type(5) {
    z-index: ${props => (props.fade ? 1 : 6)};
    transform: translate(${4 * 8}px, 0);
  }
`;

const MapMarker = ({ fade, onClick, task, ...props }) => (
  <Wrapper fade={fade}>
    <Marker onClick={onClick} time={task.start_time} status={task.status} fade={fade} {...props} />
  </Wrapper>
);

export default MapMarker;
