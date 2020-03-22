import * as ActionTypes from './ActionTypes';
export const InitialFeedback = (state = { errMess: null, feedbacks:[]}, action) => {
    switch (action.type) {
      case ActionTypes.ADD_FEEDBACKS:
      var feedback = action.payload;
      return { ...state.feedbacks.concat(feedback)} ;
 default:
  return state;
 }

};