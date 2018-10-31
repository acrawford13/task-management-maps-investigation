import { OverlayView } from 'react-google-maps';

class CustomClusteringOverlay extends OverlayView {
  setVisible(visible)
    {
      console.log(visible);
    };

  getPosition()
  {   console.log('asdasdasdasdasdasd');
        return this.position;
  };
}

export default CustomClusteringOverlay;