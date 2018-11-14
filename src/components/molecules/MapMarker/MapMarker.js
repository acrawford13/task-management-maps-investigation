import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { OverlayView } from 'react-google-maps';

import Marker from 'components/atoms/Marker/Marker';
import DurationMarker from 'components/atoms/DurationMarker/DurationMarker';

export const Wrapper = styled.div`
  transform-origin: bottom center;
  transition: transform 0.5s;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  &:hover {

  } */
`

const MessagesWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

class MapMarker extends Component {
  componentDidUpdate() {
  }

  getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -64,
  });

  shouldComponentUpdate = nextProps => {
    return (((this.props.selected || this.props.selected !== nextProps.selected) && this.props.paths !== nextProps.paths) || this.props.selected !== nextProps.selected || this.props.fade !== nextProps.fade || this.props.task.status !== nextProps.task.status);
  }

  render () {
    console.log(this.props.paths);
    return (
      // <OverlayView
      //   getPixelPositionOffset={this.getPixelPositionOffset}
      //   position={this.props.position}
      //   mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      //   options={{zIndex: -1}}>
        <Wrapper>
          <Marker options={{zIndex: 0}} onClick={this.props.onClick} time={this.props.task.start_time} status={this.props.task.status} {...this.props} />
          {this.props.selected && <MessagesWrapper>
          {this.props.paths.map(path => {
            if(path.to.id === this.props.task.id) return <DurationMarker warning={path.warning}>{path.route.duration.text} from previous task</DurationMarker>;
            if(path.from.id === this.props.task.id) return <DurationMarker warning={path.warning}>{path.route.duration.text} to next task</DurationMarker>;
          })}
          </MessagesWrapper>}
        </Wrapper>
      // </OverlayView>
    );
  }
}
 
export default MapMarker;