import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GoogleMap, withScriptjs, withGoogleMap, Polyline as BasePolyline } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import mapStyles from './mapStyles';
import { MAP } from 'react-google-maps/lib/constants';

import { getDataset } from 'utils/datasets';
import tasks from 'tasks.js';
import people from 'people.js';
import { findClosestProvider } from 'ducks/tasks/tasks';

import MapMarkerCluster from 'components/molecules/MapMarkerCluster/MapMarkerCluster';
import { selectTask, setSidebarView } from 'ducks/view/view';
import { setFocusedTask, addPaths, clearPaths } from 'ducks/map/map';
import { List } from 'immutable';

const Wrapper = styled.div`
  grid-row: 1;
  grid-column: 1;
`

const Polyline = ({ route, type, warning }) => {
  const decodedPolyline = window.google.maps.geometry.encoding.decodePath(route.overview_polyline);
  var lineSymbol = {
    path: 'M 0.5,0.3 0.5,0.1 0,-0.3 -0.5,0.1 -0.5,0.3 0,-0.1 z',
    strokeWeight: 0,
    fillColor: 'white',
    fillOpacity: 0.65,
  };

  const icons = type && [{icon: lineSymbol, offset: '0', repeat: '25px'}];
  return (
    <Fragment>
      <BasePolyline
        options={{
          icons,
          strokeWeight: 10,
          strokeOpacity: type ? 1 : 0.2,
          strokeColor: warning ? "red" : "#2ccadd"}} path={decodedPolyline} />
    </Fragment>
  );
}

const mapOptions = {
  styles: mapStyles,
  gestureHandling: "greedy",
}

class Map extends Component {
  componentDidMount() {
    this.mapInstance = this.ref.map.context[MAP];
    const transitLayer = new window.google.maps.TransitLayer();
    transitLayer.setMap(this.mapInstance);
  }

  componentDidUpdate() {
    if(this.props.map.focused_task ){
      this.ref.map.panTo(this.props.map.focused_task.location);
    }
  };

  ref = {
    map: undefined,
  }

  setRef = ref => {
    this.ref.map = ref;
  }

  state = {
    tasks,
    people,
  }

  handleTaskView = task => {
    this.ref.map.panTo(task.location);
  }

  goToTask = task => {
    this.ref.map.panTo(task.location);
  }

  onCenterChanged = () => {
    // this.props.setFocusedTask(null);
  }

  markerIsSelected = task => task.id === this.props.view.selected_task || !!(this.props.map.focused_task && task.id === this.props.map.focused_task.id);
  markerIsFaded = task => !!this.props.view.selected_task &&
    task.id !== this.props.view.selected_task &&
    !this.props.providers.getIn([this.props.view.selected_provider, 'tasks'], List([])).contains(task.id);

  getMarkerPaths = task => this.props.map.paths.filter(path => path.from.id === task.id || path.to.id === task.id)

  getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height * 0.95),
  });

  


  render() {
    return (
    <Fragment>
      <GoogleMap
        ref={this.setRef}
        defaultZoom={13}
        defaultCenter={getDataset().center}
        onCenterChanged={this.onCenterChanged}
        options={mapOptions}
      >
      
      
        {this.props.tasks.toList().groupBy(task => task.get('location')).toList().toJS().map((locationGroup, index) => (
          <MapMarkerCluster
            key={index}
            markers={locationGroup.map(task => ({
              task,
              selected: this.markerIsSelected(task),
              fade: this.markerIsFaded(task),
              paths: this.getMarkerPaths(task),
            }))}
            onMarkerClick={
              (task) => {
                this.props.setSidebarView(task.status === 'assigned' ? 'provider_detail' : 'task_assignment');
                this.props.selectTask(task);
                this.goToTask(task)
              }
            }
          />
        ))}
        {this.props.map.paths.map(step => <Polyline zoom={this.ref.map.getZoom()} {...step} />)}
      </GoogleMap>
    </Fragment>)
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  providers: state.providers,
  view: state.view.toJS(),
  map: state.map.toJS(),
});

const mapDispatchToProps = dispatch => ({
  findClosestProvider: props => dispatch(findClosestProvider(props)),
  selectTask: task => dispatch(selectTask(task)),
  setFocusedTask: task => dispatch(setFocusedTask(task)),
  setSidebarView: path => dispatch(setSidebarView(path)),
  addPaths: paths => dispatch(addPaths(paths)),
  clearPaths: () => dispatch(clearPaths()),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <Wrapper />,
    mapElement: <div style={{ height: '100%' }} />,
    isMarkerShown: true,
  }),
  withScriptjs,
  withGoogleMap
)(Map);