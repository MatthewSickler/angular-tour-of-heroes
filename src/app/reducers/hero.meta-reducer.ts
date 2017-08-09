export const SET_LIST_STATE = "SET_LIST_STATE";
export const SET_DASHBOARD_STATE = "SET_DASHBOARD_STATE";

const INIT = "INITIALIZE_HEROES";
const NONE_ACTIVE = 0;
const LIST_ACTIVE = 1;
const DASHBOARD_ACTIVE = 2;

export function heroMetaReducer(reducer) {
  let listState = reducer(undefined, {type: INIT}), dashboardState = reducer(undefined, {type: INIT}), activeState = NONE_ACTIVE;
  // console.log("Meta Reducer");

  return function (state, action) {
    switch(action.type) {

      case SET_LIST_STATE:
      // console.log("Active State: " + activeState);
      // console.log("Set List State");
        switch(activeState) {
          case NONE_ACTIVE:
          activeState = LIST_ACTIVE;
            return Object.assign({}, listState);

          case DASHBOARD_ACTIVE:
            dashboardState = Object.assign({}, state);
            activeState = LIST_ACTIVE;
            return Object.assign({}, listState);

          default:
            return state;
        }


      case SET_DASHBOARD_STATE:
      // console.log("Active State: " + activeState);
      // console.log("Set Dashboard State");
        switch(activeState) {
          case NONE_ACTIVE:
          activeState = DASHBOARD_ACTIVE;
            return Object.assign({}, dashboardState);

          case LIST_ACTIVE:
            listState = Object.assign({}, state);
            activeState = DASHBOARD_ACTIVE;
            return Object.assign({}, dashboardState);

          default:
            return state;
        }
    }

    let nextState = reducer(state, action);
    return nextState;
  }


}
