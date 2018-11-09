import { Map } from 'immutable';

export const VIEW_PROVIDER_DETAILS = 'VIEW_PROVIDER_DETAILS';
export const HIDE_PROVIDER_DETAILS = 'HIDE_PROVIDER_DETAILS';
export const SET_SIDEBAR_VIEW = 'SET_SIDEBAR_VIEW';
export const SELECT_TASK = 'SELECT_TASK';

const initialState = Map({
  sidebar_view: 'tasks',
  selected_task: null,
  viewing_provider: null,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_SIDEBAR_VIEW:
      return state.setIn(['sidebar_view'], action.payload.view);
    case SELECT_TASK:
      return state.setIn(['selected_task'], action.payload.taskID);
    case VIEW_PROVIDER_DETAILS:
      return state.setIn(['viewing_provider'], action.payload.providerID);
    case HIDE_PROVIDER_DETAILS:
      return state.setIn(['viewing_provider'], null);
    default:
      return state;
  }
}

export function viewProviderDetails(providerID) {
  return {
    type: VIEW_PROVIDER_DETAILS,
    payload: { providerID },
  };
}

export function hideProviderDetails() {
  return {
    type: HIDE_PROVIDER_DETAILS,
  };
}

export function setSidebarView(view) {
  return {
    type: SET_SIDEBAR_VIEW,
    payload: { view },
  };
}

export function selectTask(taskID) {
  return {
    type: SELECT_TASK,
    payload: { taskID },
  };
}
