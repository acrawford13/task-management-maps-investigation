import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { OverlayView } from 'react-google-maps';
import { List } from 'immutable';

import Cluster from './components/Cluster';

class MapMarkerCluster extends Component {
  componentDidUpdate() {
    console.log('updated')
  }

  shouldComponentUpdate = nextProps => {
    // return false;
    const nextMarkers = List(nextProps.markers);
    const prevMarkers = List(this.props.markers);
    const compare = this.props.markers.reduce((acc, marker) => acc + marker.selected + marker.task.status + marker.fade + marker.paths.length, '');
    const comparing = nextProps.markers.reduce((acc, marker) => acc + marker.selected + marker.task.status + marker.fade + marker.paths.length, '');
    // return !nextMarkers.equals(prevMarkers);
    // console.log(compare === comparing);
    // console.log(comparing, compare);
    return compare !== comparing;

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
        <Cluster markers={this.props.markers} onMarkerClick={this.props.onMarkerClick} />
      </OverlayView>
    );
  }
}
 
export default MapMarkerCluster;