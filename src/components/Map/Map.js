import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { GoogleMap, Marker as BaseMarker, withScriptjs, withGoogleMap, Polyline as BasePolyline } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { compose, withProps } from 'recompose';
import GuestReadyIcon from '../../assets/favicon-32x32.png';
import ProviderIcon from '../../assets/user.png';

import * as taskActions from '../../ducks/tasks/tasks';

import tasks from '../../tasks.js'
import people from '../../people.js'
import { PROVIDER_TYPES } from '../../constants.js'
import TaskLabel from '../TaskLabel/TaskLabel';
import TravelInfo from '../TravelInfo/TravelInfo';
import Overlay from '../CustomClusteringOverlay/CustomClusteringOverlay';



const onClusteringEnd = (args, moreArgs) => {
  // console.log('clustering has ended', args, moreArgs);
};

const ClusterHider = props => props.visible && props.children;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const TaskListItem = styled.li`
  color: #888888;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
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
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr auto;
  box-sizing: border-box;
`

const Sidebar = styled.div`
  width: 20vw;
  height: 100vh;
  background-color: #fefefe;
  overflow-y: auto;
`

const Marker = ({ label, ...props}) => <BaseMarker defaultIcon={GuestReadyIcon} {...props} />;

const TasksOverlay = props => <Overlay {...props} />;
const Polyline = ({ encodedPolyline, ...props }) => <BasePolyline {...props} path={window.google.maps.geometry.encoding.decodePath(encodedPolyline)} />
const TransitPath = ({ method, ...props }) => {
  let strokeColor;
  console.log(method);
  switch(method) {
    case "WALKING":
      strokeColor = '#fff';
      break;
    case "BUS":
      strokeColor = '#f79931';
      break;
    default:
      strokeColor = '#0066b3';
  }
  return <Polyline options={{strokeColor}} {...props} />
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

  findProvider = task => {
    console.log(task.location);
  }

  handleTaskView = task => {
    this.ref.map.panTo(task.location);
  }

  onCenterChanged = () => {
    console.log('center has changed');
  }

  render() {
    return (
    <Fragment>
      <GoogleMap
        ref={this.setRef}
        defaultZoom={14}
        defaultCenter={{ lat: -35.294, lng: 149.126 }}
        onCenterChanged={this.onCenterChanged}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          onClusteringEnd={onClusteringEnd}
          gridSize={60}
        >
          {this.props.tasks.map(task => <Marker onMouseEnter={() => {console.log('marker clicked')}} position={task.location} />)}
        </MarkerClusterer>

        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          onClusteringEnd={onClusteringEnd}
          imagePath="http://localhost:3000/m"
          gridSize={60}
          styles={[
            {
              url: "http://localhost:3000/m/user.png",
              height: 53,
              lineHeight: 53,
              width: 53,
            },
            {
              url: "http://localhost:3000/m/m1.png",
              height: 56,
              lineHeight: 56,
              width: 56,
            },
            {
              url: "http://localhost:3000/m/m1.png",
              height: 66,
              lineHeight: 66,
              width: 66,
            },
            {
              url: "http://localhost:3000/m/m1.png",
              height: 78,
              lineHeight: 78,
              width: 78,
            },
            {
              url: "http://localhost:3000/m/m1.png",
              height: 90,
              lineHeight: 90,
              width: 90,
            },
          ]}
        >
          {this.state.people.map(person => <Marker icon={ProviderIcon} onMouseEnter={() => {console.log('marker clicked')}} position={person.location} />)}
        </MarkerClusterer>
        <ClusterHider visible>
        {this.props.tasks.map(task => <TasksOverlay
          position={task.location}
          mapPaneName={Overlay.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={(w, h) => ({x: -w/2, y: -h/2})}
        >
          <TaskLabel name={task.label} type={task.type} />
        </TasksOverlay>)}
        </ClusterHider>
        {this.props.tasks[0].closest_providers[0] && this.props.tasks[0].closest_providers[0].transitInfo.routes[0].legs[0].steps.map(step =>
          <TransitPath method={step.travel_mode} encodedPolyline={step.polyline.points} />
        )}
      </GoogleMap>
      <Sidebar>
        <TaskList>
          {this.props.tasks.map(task => 
            <TaskListItem>
              <strong>{task.label}</strong>
              <div>{moment(task.start_time).diff(moment()) > 0 ? 'starts' : 'started'} {moment(task.start_time).fromNow()}</div>
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
              {task.closest_providers && task.closest_providers.map(provider => <TravelInfo provider={provider} task={task} />)}
            </TaskListItem>
          )}
      </TaskList>
      </Sidebar>
    </Fragment>)
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.toJS(),
});

export default compose(
  connect(mapStateToProps, taskActions),
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