import { Map } from 'immutable';

export const VIEW_PROVIDER_DETAILS = 'VIEW_PROVIDER_DETAILS';
export const HIDE_PROVIDER_DETAILS = 'HIDE_PROVIDER_DETAILS';

export default function reducer(state = Map({}), action = {}) {
  switch(action.type) {
    case VIEW_PROVIDER_DETAILS:
      return state.setIn(['viewing_provider'], action.payload.provider);
    case HIDE_PROVIDER_DETAILS:
      return state.setIn(['viewing_provider'], null);
    default: return state;
  }
}

export function viewProviderDetails(provider) {
  return {
    type: VIEW_PROVIDER_DETAILS,
    payload: { provider }
  }
}

export function hideProviderDetails() {
  return {
    type: HIDE_PROVIDER_DETAILS,
  }
}