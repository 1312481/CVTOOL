

export function profileHasErrored(state = false, action) {
    switch (action.type) {
        case 'PROFILE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function profileIsLoaded(state = false, action) {
    switch (action.type) {
        case 'PROFILE_IS_LOADED':
            {

                return action.isLoaded;
            }
        default:
            return state;
    }
}


export function profile(state = [], action) {
    switch (action.type) {
        case 'PROFILE_FETCH_DATA_SUCCESS': {

            return action.profile;
        }
        default:
            return state;
    }
}
export function profileUpdate(state = [], action) {
    switch (action.type) {
        case 'PROFILE_UPDATE_DATA': {

            return action.profile;
        }
        default:
            return state;
    }
}

export function nameEditing(state = false, action) {
    switch (action.type) {
        case 'NAME_IS_EDITING': {
            return action.isBeingEdited;
        }
        default:
            return state;
    }
}