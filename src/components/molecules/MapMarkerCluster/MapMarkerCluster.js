import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { OverlayView } from 'react-google-maps';
import { List } from 'immutable';

import statusData from 'utils/statusData';
import { MarkerPath } from 'components/atoms/Marker/Marker';
import MapMarker, { Wrapper as MapMarkerWrapper } from 'components/molecules/MapMarker/MapMarker';
import DurationMarker from 'components/atoms/DurationMarker/DurationMarker';

const Wrapper = styled.div`
  position: relative;
  transition: transform 0.5s;
  transform-origin: bottom center;

  ${props => props.animate && `
  &:hover {
    z-index: 5;
    transform: rotate(${-22.5 * (props.markers - 1)}deg);
    ${Dot} {
      opacity: 0;
    }
    ${MapMarkerWrapper}:nth-of-type(1) {
      transform: rotate(0) translate(0, -25px);
    }
    ${MapMarkerWrapper}:nth-of-type(2) {
      transform: rotate(45deg) translate(0, -25px);
    }
    ${MapMarkerWrapper}:nth-of-type(3) {
      transform: rotate(90deg) translate(0, -25px);
    }
  }`}
`

const MarkerWrapper = styled.div`
  transform: translate(-50%, 0);
  position: relative;
  bottom: 0;
  left: 50%;
  display: grid;
  text-align: center;
  &:hover {
    ${MarkerPath} {
      opacity: 1;
    }
  }
`

const Badge = styled.span`
  height: 1.25rem;
  width: 1.25rem;
  background-color: #444;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  font-weight: bold;
  transform: translate(-50%, -50%);
  transition: transform 0.5s, opacity 0.25s;
  z-index: 5;
`

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
  background-color: ${props => props.fade ? props.statusColor.fadeColor : props.statusColor.color};
  display: inline-block;
  transition: opacity 0.5s;
`

const DotWrapper = styled.span`
  height: 60%;
  width: 0;
  display: inline-block;
  transform-origin: bottom center;
  bottom: 60%;
  left: 50%;
  position: absolute;
  &:nth-of-type(1) {
    transform: rotate(-45deg);
  }
  &:nth-of-type(2) {
    transform: rotate(-30deg);
  }
  &:nth-of-type(3) {
    transform: rotate(-15deg);
  }
`

const Indicator = ({ statusColor, fade }) => {
  return <DotWrapper><Dot fade={fade} statusColor={statusColor}/></DotWrapper>;
}

class MapMarkerCluster extends Component {
  componentDidUpdate() {
    console.log('updated')
  }

  shouldComponentUpdate = nextProps => {
    const nextMarkers = List(nextProps.markers);
    const prevMarkers = List(this.props.markers);
    const compare = this.props.markers.reduce((acc, marker) => acc + marker.selected + marker.task.status + marker.fade + marker.paths.length, '');
    const comparing = nextProps.markers.reduce((acc, marker) => acc + marker.selected + marker.task.status + marker.fade + marker.paths.length, '');
    // return !nextMarkers.equals(prevMarkers);
    console.log(compare == comparing);
    console.log(comparing);
    return compare !== comparing;

    // return this.props.selectedTask !== nextProps.selectedTask
  }

  getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -64,
  });

  render () {
    return (
      <OverlayView
        getPixelPositionOffset={this.getPixelPositionOffset}
        position={this.props.markers[0].task.location}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        options={{zIndex: -1}}>
        <Fragment>
        <Wrapper markers={this.props.markers.length} animate={this.props.markers.length > 1}>
          <MarkerWrapper markers={this.props.markers.length}>
          {this.props.markers.length > 1 && this.props.markers.map(marker => <Indicator fade={marker.fade} statusColor={statusData[marker.task.status]} />)}
          {this.props.markers.map(marker => <MapMarker
              onClick={() => this.props.onMarkerClick(marker.task)}
              position={marker.task.location}
              {...marker}
            />
          )}
          </MarkerWrapper>
        </Wrapper>
          {this.props.markers.find(marker => marker.selected) && <MessagesWrapper>
          {this.props.markers.find(marker => marker.selected).paths.map(path => {
            if(path.to.id === this.props.markers.find(marker => marker.selected).task.id) return <DurationMarker warning={path.warning}>{path.route.duration.text} from previous task</DurationMarker>;
            if(path.from.id === this.props.markers.find(marker => marker.selected).task.id) return <DurationMarker warning={path.warning}>{path.route.duration.text} to next task</DurationMarker>;
          })}
          </MessagesWrapper>}
        </Fragment>
      </OverlayView>
    );
  }
}
 
export default MapMarkerCluster;