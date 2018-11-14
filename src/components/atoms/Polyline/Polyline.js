import React, { Component } from 'react';
import { Polyline as BasePolyline, OverlayView } from 'react-google-maps';

class Polyline extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height * 0.95),
  });

  render () {
    console.log(this.props);
    return (
      // <OverlayView
      //   style={{zIndex: 999, position: 'relative'}}
      //   getPixelPositionOffset={this.getPixelPositionOffset}
      //   position={this.props.path[0]}
      //   mapPaneName={OverlayView.FLOAT_PANE}>
        <BasePolyline {...this.props} options={{zIndex: 10000}} />
      // </OverlayView>
    );
  }
}
 
export default Polyline;