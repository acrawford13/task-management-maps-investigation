import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

import statusData from 'utils/statusData';
import { MarkerPath } from 'components/atoms/Marker/Marker';
import MapMarker, { Wrapper as MapMarkerWrapper } from 'components/molecules/MapMarker/MapMarker';
import DurationMarker from 'components/atoms/DurationMarker/DurationMarker';

const Wrapper = styled.div`
  cursor: pointer;
  position: absolute;
  height: 0;
  display: inline-block;
  width: 0;
  ${props =>
    props.animate &&
    `
  &:hover {
    ${Dot} {
      opacity: 0;
    }
    ${MarkerWrapper} {
      opacity: 1;
      z-index: 5;
      // transform: translate(-50%, 0) rotate(${-22.5 * (props.markers - 1)}deg);
    }
    ${BadgeWrapper} {
      opacity: 0;
    }
    ${MapMarkerWrapper}:nth-of-type(1) {
      // transform: rotate(0) translate(0, -25px);
      transform: translate(${50 * 0}px, 0);
      > {
        opacity: 0;
      }
    }
    ${MapMarkerWrapper}:nth-of-type(2) {
      // transform: rotate(45deg) translate(0, -25px);
      transform: translate(${50 * 1}px, 0);
    }
    ${MapMarkerWrapper}:nth-of-type(3) {
      // transform: rotate(90deg) translate(0, -25px);
      transform: translate(${50 * 2}px, 0);
    }
    ${MapMarkerWrapper}:nth-of-type(4) {
      // transform: rotate(135deg) translate(0, -25px);
      transform: translate(${50 * 3}px, 0);
    }
    ${MapMarkerWrapper}:nth-of-type(5) {
      // transform: rotate(180deg) translate(0, -25px);
      transform: translate(${50 * 4}px, 0);
    }
    ${MapMarkerWrapper}:nth-of-type(6) {
      // transform: rotate(225deg) translate(0, -25px);
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

const Badge = styled.span`
  background-color: ${props => statusData[props.task.status]['color']};
  color: white;
  border-radius: 0.4rem;
  padding: 0.1rem 0.25rem;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  font-weight: 500;
`;

const MessagesWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const Dot = styled.span`
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 50%;
  background-color: ${props => (props.fade ? props.statusColor.fadeColor : props.statusColor.color)};
  display: inline-block;
  display: none;
  transition: opacity 0.5s;
`;

const DotWrapper = styled.span`
  height: 55%;
  width: 0;
  display: inline-block;
  transform-origin: bottom center;
  bottom: 60%;
  left: 50%;
  position: absolute;
  z-index: 5;
  &:nth-of-type(1) {
    transform: rotate(-60deg);
  }
  &:nth-of-type(2) {
    transform: rotate(-40deg);
  }
  &:nth-of-type(3) {
    transform: rotate(-20deg);
  }
  &:nth-of-type(4) {
    transform: rotate(0deg);
  }
  &:nth-of-type(5) {
    transform: rotate(20deg);
  }
  &:nth-of-type(6) {
    transform: rotate(40deg);
  }
`;

const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: grey;
  transition: opacity 0.5s;
`;

const Indicator = ({ statusColor, task, fade }) => {
  return (
    <DotWrapper>
      <Dot fade={fade} statusColor={statusColor} />
    </DotWrapper>
  );
};

const TaskBadge = ({ task }) => {
  return <Badge task={task}>{moment.utc(task.start_time).format('HH:mm')}</Badge>;
};

const Cluster = ({ markers, onMarkerClick }) => {
  const selected = markers.find(marker => marker.selected);
  return (
    <Fragment>
      <Wrapper selected={!!markers.find(marker => !marker.fade)} markers={markers.length} animate={markers.length > 1}>
        <MarkerWrapper animate={markers.length > 1} markers={markers.length}>
          {markers.length > 1 &&
            markers.map(marker => (
              <Indicator
                key={marker.task.id}
                task={marker.task}
                fade={marker.fade}
                statusColor={statusData[marker.task.status]}
              />
            ))}
          {markers.map(marker => (
            <MapMarker
              key={marker.task.id}
              onClick={() => onMarkerClick(marker.task)}
              position={marker.task.location}
              {...marker}
            />
          ))}
        </MarkerWrapper>
        {/* {markers.length > 1 && <BadgeWrapper>{markers.map(marker => <TaskBadge key={marker.task.id} task={marker.task} />)}</BadgeWrapper>} */}
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
