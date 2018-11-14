import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { OverlayView } from 'react-google-maps';

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
  transition: all 0.5s;
`

const MessagesWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

class MapMarkerCluster extends Component {
  componentDidUpdate() {
  }

  getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: 0,
  });

  shouldComponentUpdate = nextProps => {
    return (((this.props.selected || this.props.selected !== nextProps.selected) && this.props.paths !== nextProps.paths) || this.props.selected !== nextProps.selected || this.props.fade !== nextProps.fade || this.props.task.status !== nextProps.task.status);
  }

  render () {
    console.log(this.props.tasks);
    return (
      <OverlayView
        getPixelPositionOffset={this.getPixelPositionOffset}
        position={this.props.tasks[0].location}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        options={{zIndex: -1}}>
        <Wrapper animate={this.props.tasks.length > 1}>
          <MarkerWrapper>
          {this.props.tasks.length > 1 && <Badge>{this.props.tasks.length}</Badge>}
          {this.props.tasks.map(task =>
            <MapMarker task={task} position={task.location} />
          )}
          </MarkerWrapper>
        </Wrapper>
      </OverlayView>
    );
  }
}
 
export default MapMarkerCluster;