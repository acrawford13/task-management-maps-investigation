import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { OverlayView } from 'react-google-maps';
import { List } from 'immutable';

import statusData from 'utils/statusData';
import Marker from 'components/atoms/Marker/Marker';
import MapMarker, { Wrapper as MapMarkerWrapper } from 'components/molecules/MapMarker/MapMarker';
import DurationMarker from 'components/atoms/DurationMarker/DurationMarker';

const Wrapper = styled.div`
  position: relative;
  transition: transform 0.5s;

  ${props => props.animate && `
  &:hover {
    transform: rotate(${-22.5 * (props.markers / 2)}deg);
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
  position: absolute;
  bottom: 0;
  left: 50%;
  display: grid;
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
  background-color: ${props => props.statusColor};
  display: inline-block;
  transition: opacity 0.5s;
`

const DotWrapper = styled.span`
  height: 70%;
  width: 0;
  display: inline-block;
  transform-origin: bottom center;
  bottom: 50%;
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

const Indicator = ({ statusColor }) => {
  return <DotWrapper><Dot statusColor={statusColor}/></DotWrapper>;
}

class MapMarkerCluster extends Component {
  componentDidUpdate() {
  }

  shouldComponentUpdate = nextProps => {
    const nextMarkers = List(nextProps.markers);
    const prevMarkers = List(this.props.markers);
    return !nextMarkers.equals(prevMarkers);

    // return this.props.selectedTask !== nextProps.selectedTask
  }

  getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: 0,
  });

  render () {
    return (
      <OverlayView
        getPixelPositionOffset={this.getPixelPositionOffset}
        position={this.props.markers[0].task.location}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        options={{zIndex: -1}}>
        <Wrapper markers={this.props.markers.length} animate={this.props.markers.length > 1}>
          <MarkerWrapper markers={this.props.markers.length}>
          {this.props.markers.length > 1 && this.props.markers.map(marker => <Indicator statusColor={statusData[marker.task.status]['color']} />)}
          {this.props.markers.map(marker => <MapMarker
              onClick={() => this.props.onMarkerClick(marker.task)}
              position={marker.task.location}
              {...marker}
            />
          )}
          </MarkerWrapper>
        </Wrapper>
      </OverlayView>
    );
  }
}
 
export default MapMarkerCluster;