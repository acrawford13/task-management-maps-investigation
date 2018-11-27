import { Map, List } from 'immutable';

export const SELECT_PROVIDER = 'SELECT_PROVIDER';
export const SET_SIDEBAR_VIEW = 'SET_SIDEBAR_VIEW';
export const SELECT_TASK = 'SELECT_TASK';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const SET_LOCATION = 'SET_LOCATION';

const initialState = Map({
  location: null,
  sidebar_view: 'tasks',
  selected_task: null,
  selected_provider: null,
  notifications: List([]),
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return state.update('notifications', notifications => notifications.push(action.payload.notification));
    case REMOVE_NOTIFICATION:
      return state.update('notifications', notifications => notifications.splice(action.payload.notificationId, 1));
    case CLEAR_NOTIFICATIONS:
      return state.set('notifications', List([]));
    case SET_SIDEBAR_VIEW:
      return state.setIn(['sidebar_view'], action.payload.view).set('notifications', List([]));
    case SELECT_TASK:
      return state
        .set('notifications', List([]))
        .setIn(['selected_task'], action.payload.task ? action.payload.task.id : null)
        .setIn(['selected_provider'], action.payload.task ? action.payload.task.assigned_provider : null);
    case SELECT_PROVIDER:
      return state.setIn(['selected_provider'], action.payload.providerID);
    case SET_LOCATION:
      return state.set('location', action.payload.location);
    default:
      return state;
  }
}

export function selectProvider(providerID) {
  return {
    type: SELECT_PROVIDER,
    payload: { providerID },
  };
}

export function addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    payload: { notification },
  };
}

export function removeNotification(notificationId) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: { notificationId },
  };
}

export function clearNotifications() {
  return {
    type: CLEAR_NOTIFICATIONS,
  };
}

export function setSidebarView(view) {
  return {
    type: SET_SIDEBAR_VIEW,
    payload: { view },
  };
}

export function setLocation(location) {
  return {
    type: SET_LOCATION,
    payload: { location },
  };
}

export function selectTask(task) {
  return {
    type: SELECT_TASK,
    payload: { task },
  };
}
