import * as ActionTypes from '../actions/profile'

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

export function profile(state = [], action) {
    switch (action.type) {
        case ActionTypes.FETCH_PROFILE_DATA_SUCCESS: {
            console.log(action.profile[0])
            return action.profile[0];
        }
        case ActionTypes.UPDATE_PROFILE_DATA: {

            return {...state,
                profile: action.profile
            }
            
        }
        case ActionTypes.FETCH_KEY_ID: {
            console.log(action);
            return action.key;
        }
        default:
            return state;
    }
}
