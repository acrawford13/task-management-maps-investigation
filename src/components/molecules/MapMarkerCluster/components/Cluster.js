import React, { Fragment } from 'react';
import styled from 'styled-components';

import { MarkerPath } from 'components/atoms/Marker/Marker';
import MapMarker, { Wrapper as MapMarkerWrapper } from 'components/molecules/MapMarker/MapMarker';
import DurationMarker from 'components/atoms/DurationMarker/DurationMarker';

const Wrapper = styled.div`
  cursor: pointer;
  position: absolute;
  height: 0;
  display: inline-block;
  width: 0;
  z-index: ${props => (props.selected ? 11 : 5)};
  &:hover {
    z-index: 12;
  }
  ${props =>
    props.animate &&
    `
  &:hover {
    ${MarkerWrapper} {
      opacity: 1;
      z-index: 5;
    }
    ${MapMarkerWrapper}:nth-of-type(1) {
      transform: translate(${50 * 0}px, 0);s
    }
    ${MapMarkerWrapper}:nth-of-type(2) {
      transform: translate(${50 * 1}px, 0);
    }
    ${MapMarkerWrapper}:nth-of-type(3) {
      transform: translate(${50 * 2}px, 0);
    }
    ${MapMarkerWrapper}:nth-of-type(4) {
      transform: translate(${50 * 3}px, 0);
    }
    ${MapMarkerWrapper}:nth-of-type(5) {
      transform: translate(${50 * 4}px, 0);
    }
    ${MapMarkerWrapper}:nth-of-type(6) {
      transform: translate(${50 * 5}px, 0);
    }
  }`}
`;

const MarkerWrapper = styled.div`
  transition: transform 0.25s linear;
  transform: translate(-50%, 0);
  position: absolute;
  bottom: 0;
  display: inline-grid;
  text-align: center;
  transform-origin: bottom center;
  &:hover {
    ${MarkerPath} {
      opacity: 1;
    }
  }
`;

const MessagesWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const Cluster = ({ markers, onMarkerClick }) => {
  const selected = markers.find(marker => marker.selected);
  return (
    <Fragment>
      <Wrapper selected={!!markers.find(marker => !marker.fade)} markers={markers.length} animate={markers.length > 1}>
        <MarkerWrapper animate={markers.length > 1} markers={markers.length}>
          {markers.map(marker => (
            <MapMarker
              key={marker.task.id}
              onClick={() => onMarkerClick(marker.task)}
              position={marker.task.location}
              {...marker}
            />
          ))}
        </MarkerWrapper>
        {selected && (
          <MessagesWrapper>
            {selected.paths.map(path => {
              if (path.to.id === selected.task.id)
                return (
                  <DurationMarker warning={path.warning}>{path.route.duration.text} from previous task</DurationMarker>
                );
              if (path.from.id === selected.task.id)
                return <DurationMarker warning={path.warning}>{path.route.duration.text} to next task</DurationMarker>;
            })}
          </MessagesWrapper>
        )}
      </Wrapper>
    </Fragment>
  );
};

export default Cluster;
