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
export function user(state = "", action) {
    switch (action.type) {
        case ActionTypes.FETCH_USER:
            {
                return action.user;
            }
        default:
            return state;
    }
}

export function profile(state = [], action) {
    switch (action.type) {
        case ActionTypes.FETCH_PROFILE_DATA_SUCCESS: {
            console.log(action);
            return action.profile[0].data[0];
        }
        case ActionTypes.UPDATE_PROFILE_DATA: {
    

            return action.profile
        }
        case ActionTypes.FETCH_KEY_ID: {
            return action.key;
        }
        default:
            return state;
    }
}
