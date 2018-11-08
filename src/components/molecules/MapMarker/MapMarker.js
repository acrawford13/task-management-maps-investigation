import React from 'react';
import { OverlayView } from 'react-google-maps';
import moment from 'moment-timezone';

import Marker from 'components/atoms/Marker/Marker';

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height * 0.95),
});

const MapMarker = ({ position, ...props }) => (
  <OverlayView
    getPixelPositionOffset={getPixelPositionOffset}
    position={position}
    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
    <Marker time={moment(props.task.start_time).format('HH:mm')} {...props} />
  </OverlayView>
)
 
export default MapMarker;