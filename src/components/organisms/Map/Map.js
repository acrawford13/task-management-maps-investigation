import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { GoogleMap, Marker as BaseMarker, OverlayView, withScriptjs, withGoogleMap, Polyline as BasePolyline, InfoWindow } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, withProps, withState } from 'recompose';
import GuestReadyIcon from 'assets/favicon-32x32.png';
import mapStyles from './mapStyles';

import tasks from 'tasks.js'
import people from 'people.js'
import { PROVIDER_TYPES } from 'constants.js'
import TravelInfo from 'components/TravelInfo/TravelInfo';
import { viewProviderDetails, hideProviderDetails } from 'ducks/view/view';
import { findClosestProvider } from 'ducks/tasks/tasks';
import InfoWindowContent from 'components/InfoWindowContent/InfoWindowContent';

import MapMarker from 'components/molecules/MapMarker/MapMarker';

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

const Wrapper = styled.div`
  /* height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr auto;
  box-sizing: border-box; */
`

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

// const Marker = ({ label, isOpen, setIsOpen, ...props}) =>
//   <BaseMarker defaultIcon={GuestReadyIcon} {...props} />;

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
  ref = {
    map: undefined,
  }

  setRef = ref => {
    this.ref.map = ref;
  }

  state = {
    tasks,
    people,
    mapCenter: null,
  }

  handleTaskView = task => {
    this.ref.map.panTo(task.location);
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
          {this.props.tasks.map((task, index) => <MapMarker selected={index === 1} position={task.location} task={task} />)}

        
        {this.props.tasks[0].closest_providers[0] &&
         this.props.tasks[0].closest_providers[0].transitInfo.routes[0].legs[0].steps.map(
          step =>
            <TransitPath method={step.travel_mode} encodedPolyline={step.polyline.points} />
        )}
      </GoogleMap>
      {this.props.view.viewing_provider &&
        <ProviderModal
          closeProviderModal={this.props.hideProviderDetails}
          provider={this.props.view.viewing_provider}
        />
      }
      {/* <Sidebar>
        <TaskList>
          {this.props.tasks.map(task => 
            <TaskListItem>
              <strong>{task.label}</strong>
              <div>
                {moment(task.start_time).diff(moment()) > 0 ? 'starts' : 'started'}{' '}
                {moment(task.start_time).fromNow()}
              </div>
              <TaskListActions>
                <TaskListAction
                  onClick={() => this.handleTaskView(task)}
                >
                  View
                </TaskListAction>
                <TaskListAction
                  onClick={() => this.props.findClosestProvider(task)}
                >
                  Find closest {PROVIDER_TYPES[task.type]}
                </TaskListAction>
              </TaskListActions>
              Closest {PROVIDER_TYPES[task.type]}:{' '}
              {task.closest_providers && task.closest_providers.map(provider =>
                <TravelInfo provider={provider} task={task} />
              )}
            </TaskListItem>
          )}
      </TaskList>
      </Sidebar> */}
    </Fragment>)
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.toJS(),
  view: state.view.toJS(),
});

const mapDispatchToProps = dispatch => ({
  findClosestProvider: props => dispatch(findClosestProvider(props)),
  viewProviderDetails: props => dispatch(viewProviderDetails(props)),
  hideProviderDetails: () => dispatch(hideProviderDetails()),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <Wrapper />,
    mapElement: <div style={{ height: '100%' }} />,
    isMarkerShown: true,
  }),
  withScriptjs,
  withGoogleMap
)(Map);