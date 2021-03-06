import * as ActionTypes from '../actions/profile'
let initialState = {
    numberOfVersions: 0,
    currentVersions: 0,
    tagName: ""
}
export function isProfileError(state = false, action) {
    switch (action.type) {
        case ActionTypes.IS_PROFILE_ERROR:
            return action.hasErrored;
        default:
            return state;
    }
}

export function isProfileLoaded(state = false, action) {
    switch (action.type) {
        case ActionTypes.IS_PROFILE_LOADED:
            {
                return action.isLoaded;
            }
        default:
            return state;
    }
}
export function version(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CHANGE_VERSION_PROFILE:
            {
                return Object.assign({}, state, {
                    currentVersions: action.version
                })
            }

        case ActionTypes.INCREMENT_DATA:
            {
                let temp = state.currentVersions;
                if (state.currentVersions === state.numberOfVersions - 1) {
                    temp = 0;
                }
                else {
                    temp++;
                }

                return Object.assign({}, state, {
                    currentVersions: temp
                })
            }
        case ActionTypes.DECREMENT_DATA:
            {
                let temp = state.currentVersions;
                if (state.currentVersions === 0) {
                    temp = state.numberOfVersions - 1;
                }
                else {
                    temp--;
                }

                return Object.assign({}, state, {
                    currentVersions: temp
                })
            }
        case ActionTypes.VERSION_NUMBER:
            {
                console.log(action)
                return Object.assign({}, state, {
                    numberOfVersions: action.data,
                    currentVersions: action.data - 1
                    
                })
            }
        default:
            return state;
    }
}

export function profile(state = [], action) {
    switch (action.type) {
        case ActionTypes.FETCH_PROFILE_DATA_SUCCESS: {
            return action.profile[0].data;
        }
        case ActionTypes.UPDATE_PROFILE_DATA: {
       
            let newState = [...state];
            console.log(newState);
            newState[action.version] = action.profile;
            return newState;

        }
        case ActionTypes.FETCH_KEY_ID: {
            return action.key;
        }
        default:
            return state;
    }
}
