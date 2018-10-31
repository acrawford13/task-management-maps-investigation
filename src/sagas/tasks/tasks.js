import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import { getProvidersJS } from '../../selectors/providers';
import moment from 'moment-timezone';

import { findClosestProviderSuccessed, FIND_CLOSEST_PROVIDERS } from '../../ducks/tasks/tasks';

export const isProviderAvailable = ({ existingTasks, newTask, buffer }) => {
  const taskStart = moment(newTask.start_time);
  console.log("taskStart:", taskStart);
  console.log("every:", existingTasks.every(
    existingTask => {
      console.log("start time minus buffer:", moment(existingTask.start_time).subtract(buffer, 'minutes'))
      console.log("end time plus buffer:", moment(existingTask.end_time).add(buffer, 'minutes'))
      return !taskStart.isBetween(
        moment(existingTask.start_time).subtract(buffer, 'minutes'),
        moment(existingTask.end_time).add(buffer, 'minutes')
      )
    }
  ));
  return existingTasks.every(
    existingTask => {
      return !taskStart.isBetween(
        moment(existingTask.start_time).subtract(buffer, 'minutes'),
        moment(existingTask.end_time).add(buffer, 'minutes')
      )
    }
  )
}

export const filterProvidersByTravelTimeToTask = ({ task, providers }) => {
  return providers.filter(provider => {
    const newTaskPlusTravel = { ...task, start_time: moment(task.start_time).clone().subtract(provider.transitInfo.routes[0].legs[0].duration.value, 'seconds')};
    console.log(newTaskPlusTravel);
    return isProviderAvailable({ existingTasks: provider.tasks, newTask: newTaskPlusTravel, buffer: 10 })
  })
}

export const filterProviders = ({ task, providers }) => {
  return providers.filter(provider => {
    return isProviderAvailable({ existingTasks: provider.tasks, newTask: task, buffer: 15 })
  })
}

export const filterProvidersByDistance = ({ task, providers }) => {
  return providers.filter(provider => {
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
      new window.google.maps.LatLng(provider.location),
      new window.google.maps.LatLng(task.location)
    );
    return distance <= 20000;
  })
}

export function fetchTransitData({ provider, task, directionsService }) {
  // if provider has another task after the task we're assigning,
  // we also need to check how long it will take them to get to that one.

  // however, if the provider couldn't make it from their current task to the task we're assigning,
  // we shouldn't bother finding out how long it would take them to get to the next one.
  
  const directionsToTaskRequest = {
    origin: provider.location,
    destination: task.location,
    travelMode: 'TRANSIT',
  }

  const directionsToTaskPromise = new Promise((resolve, reject) => {
    directionsService.route(directionsToTaskRequest, data => resolve({ ...provider, transitInfo: data }))
  });

  return directionsToTaskPromise;
}

export function* fetchClosestProvider({ payload: { task }}) {
  try {
    const providers = yield select(getProvidersJS);
    const filteredProviders = yield call(filterProviders, {task, providers});
    const filteredByDistance = yield call(filterProvidersByDistance, { task, providers: filteredProviders });
    console.log(filteredByDistance);
    const directionsService = new window.google.maps.DirectionsService();
    
    // here we get all the providers directions to the current task.
    const providersWithDirections = yield all(filteredByDistance.map(provider => call(fetchTransitData, { provider, task, directionsService })));

    // so here we could filter to figure out if they can make it to the assigning task.
    const filteredProvidersForTask = yield call(filterProvidersByTravelTimeToTask, { providers: providersWithDirections, task });

    // here we just order it by travel time.
    const orderedProviderDirectionsToTask = providersWithDirections.sort((a, b) => a.transitInfo.routes[0].legs[0].duration.value - b.transitInfo.routes[0].legs[0].duration.value)

    yield put(findClosestProviderSuccessed({
      task,
      providers: orderedProviderDirectionsToTask }));
  } catch (e) {
    console.log('didnt work')
  }
}

function* watchData() {
  yield takeLatest(FIND_CLOSEST_PROVIDERS, fetchClosestProvider);
}

export default watchData;
