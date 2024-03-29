import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
  currentUser: null,
  isLoading: true,

};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        //take the current user data
        currentUser: action.payload.currentUser,
        isLoading: false,

      }
    case actionTypes.CLEAR_USER:
      return {
        ...initialUserState,
        isLoading: false
      }
      default:
        return state;
  }
}

const initialChannelState = {
  currentChannel: null
};

const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      }
    default:
      return state;
  }
}

//combineReducers: => Determines What property on global state a given user updates
const rootReducer =  combineReducers({
  user: user_reducer,
  channel: channel_reducer
});

export default rootReducer;
