import React, { Component } from 'react';
import { OverlayView } from 'react-google-maps';

import Cluster from './components/Cluster';

class MapMarkerCluster extends Component {
  shouldComponentUpdate = nextProps => {
    const compare = this.props.markers.reduce((acc, marker) => acc + marker.selected + marker.task.status + marker.fade + marker.paths.length, '');
    const comparing = nextProps.markers.reduce((acc, marker) => acc + marker.selected + marker.task.status + marker.fade + marker.paths.length, '');
    return compare !== comparing;
  }

  getPixelPositionOffset = width => ({
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
        <Cluster markers={this.props.markers} onMarkerClick={this.props.onMarkerClick} />
      </OverlayView>
    );
  }
}
 
export default MapMarkerCluster;