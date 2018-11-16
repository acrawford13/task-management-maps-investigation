import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { OverlayView } from 'react-google-maps';

import Marker from 'components/atoms/Marker/Marker';
import DurationMarker from 'components/atoms/DurationMarker/DurationMarker';

export const Wrapper = styled.div`
  transform-origin: bottom center;
  transition: transform 0.25s linear;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
  /* z-index: ${props => props.fade && '5 !important'}; */
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  &:hover {

  } */


  &:nth-of-type(1) {
    z-index: ${props => props.fade ? 5 : 10 };
    transform: translate(${0 * 8}px, 0);
  }
  &:nth-of-type(2) {
    z-index: ${props => props.fade ? 4 : 9 };
    transform: translate(${1 * 8}px, 0);
  }
  &:nth-of-type(3) {
    z-index: ${props => props.fade ? 3 : 8 };
    transform: translate(${2 * 8}px, 0);
  }
  &:nth-of-type(4) {
    z-index: ${props => props.fade ? 2 : 7 };
    transform: translate(${3 * 8}px, 0);
  }
  &:nth-of-type(5) {
    z-index: ${props => props.fade ? 1 : 6 };
    transform: translate(${4 * 8}px, 0);
  }
`

const MessagesWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  position: absolute;
`;

class MapMarker extends Component {
  componentDidUpdate() {
  }

  getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -64,
  });

  shouldComponentUpdate = nextProps => {
    return true;
    return (((this.props.selected || this.props.selected !== nextProps.selected) && this.props.paths !== nextProps.paths) || this.props.selected !== nextProps.selected || this.props.fade !== nextProps.fade || this.props.task.status !== nextProps.task.status);
  }

  render () {
    return (
      // <OverlayView
      //   getPixelPositionOffset={this.getPixelPositionOffset}
      //   position={this.props.position}
      //   mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      //   options={{zIndex: -1}}>
        <Wrapper fade={this.props.fade}>
          <Marker options={{zIndex: 0}} onClick={this.props.onClick} time={this.props.task.start_time} status={this.props.task.status} {...this.props} />
          {/* {this.props.selected && <MessagesWrapper>
          {this.props.paths.map(path => {
            if(path.to.id === this.props.task.id) return <DurationMarker warning={path.warning}>{path.route.duration.text} from previous task</DurationMarker>;
            if(path.from.id === this.props.task.id) return <DurationMarker warning={path.warning}>{path.route.duration.text} to next task</DurationMarker>;
          })}
          </MessagesWrapper>} */}
        </Wrapper>
      // </OverlayView>
    );
  }
}
 
export default MapMarker;