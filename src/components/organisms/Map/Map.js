import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GoogleMap, Marker as BaseMarker, withScriptjs, withGoogleMap, Polyline as BasePolyline, InfoWindow } from 'react-google-maps';
import { compose, withProps, withState } from 'recompose';
import GuestReadyIcon from 'assets/favicon-32x32.png';
import mapStyles from './mapStyles';

import tasks from 'tasks.js';
import people from 'people.js';
import { findClosestProvider } from 'ducks/tasks/tasks';
import InfoWindowContent from 'components/InfoWindowContent/InfoWindowContent';

import MapMarker from 'components/molecules/MapMarker/MapMarker';
import { selectTask, setSidebarView } from 'ducks/view/view';
import { setFocusedTask } from 'ducks/map/map';

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const TaskListItem = styled.li`
  color: #888888;
  padding: 1rem;
  border-bottom: 1px solid #dddddd;
`

const TaskListActions = styled.div`
  margin-top: 0.5rem;
`

const TaskListAction = styled.span`
  color: #2ccadd;
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.25rem;
`

const Wrapper = styled.div``

const Modal = styled.div`
  width: 80vw;
  height: 80vh;
  background-color: white;
  position: absolute;
  top: 10vh;
  left: 10vw;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
  padding: 1rem;
`

const ProviderModal = ({ provider, closeProviderModal }) => (
  <Modal><div><h2>{provider.name}</h2></div><button onClick={closeProviderModal}>close</button></Modal>
);

const RawTaskMarker = ({ label, isOpen, task, setIsOpen, ...props}) => (
  <BaseMarker onMouseOver={() => setIsOpen(true)} defaultIcon={GuestReadyIcon} {...props}>
    {isOpen && <InfoWindow onBlur={() => setIsOpen(false)} onCloseClick={() => setIsOpen(false)}>
      <InfoWindowContent task={task} />
    </InfoWindow>}
  </BaseMarker>);

const TaskMarker = withState('isOpen', 'setIsOpen', false)(RawTaskMarker);

const Polyline = ({ encodedPolyline, ...props }) =>
  <BasePolyline {...props} path={window.google.maps.geometry.encoding.decodePath(encodedPolyline)} />;

const TransitPath = ({ method, ...props }) => {
  let strokeColor;
  switch(method) {
    case "WALKING":
      strokeColor = '#ff9933';
      break;
    case "BUS":
      strokeColor = '#f79931';
      break;
    default:
      strokeColor = '#0066b3';
  }
  return <Polyline options={{strokeColor}} {...props} />
}

const mapOptions = {
  styles: mapStyles
}

class Map extends Component {
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
    this.props.setFocusedTask(null);
  }

  render() {
    return (
    <Fragment>
      <GoogleMap
        ref={this.setRef}
        defaultZoom={14}
        defaultCenter={{ lat: -35.294, lng: 149.126 }}
        onCenterChanged={this.onCenterChanged}
        options={mapOptions}
      >
        {this.props.tasks.map((task, index) => <MapMarker onClick={() => {this.props.setSidebarView('task_assignment'); this.props.selectTask(task.id); this.goToTask(task)}} selected={task.id === this.props.view.selected_task} position={task.location} task={task} />)}
      </GoogleMap>
    </Fragment>)
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.toList().toJS(),
  view: state.view.toJS(),
  map: state.map.toJS(),
});

const mapDispatchToProps = dispatch => ({
  findClosestProvider: props => dispatch(findClosestProvider(props)),
  selectTask: taskID => dispatch(selectTask(taskID)),
  setFocusedTask: task => dispatch(setFocusedTask(task)),
  setSidebarView: path => dispatch(setSidebarView(path)),
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