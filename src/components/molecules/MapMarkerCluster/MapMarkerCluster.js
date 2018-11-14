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

  ${props => props.animate && `
  &:hover {
    ${Badge} {
      opacity: 0;
      transform: rotate(45deg) translate(-50%, calc(-50% - 25px));
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

const Indicator = styled.span`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  background-color: ${props => props.statusColor};

`

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
        <Wrapper animate={this.props.markers.length > 1}>
          <MarkerWrapper>
          {this.props.markers.map(marker => <Indicator statusColor={statusData[marker.task.status]['color']} />)}
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