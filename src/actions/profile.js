export const IS_PROFILE_ERROR = 'IS_PROFILE_ERROR'
export const IS_PROFILE_LOADED = 'IS_PROFILE_LOADED'
export const FETCH_PROFILE_DATA_SUCCESS = 'FETCH_PROFILE_DATA_SUCCESS'
export const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA'
export const FETCH_KEY_ID = 'FETCH_KEY_ID'
export const INCREMENT_DATA = 'INCREMENT_DATA'
export const DECREMENT_DATA = 'DECREMENT_DATA'
export const VERSION_NUMBER= 'VERSION_NUMBER'

export function isProfileError(isError) {
    return {
        type: IS_PROFILE_ERROR,
        isError
    };
}

export function isProfileLoaded(isLoaded) {
    return {
        type: IS_PROFILE_LOADED,
        isLoaded
    };
}

export function fetchProfileDataSuccess(profile) {
    return {
        type: FETCH_PROFILE_DATA_SUCCESS,
        profile
    };
}


export function incrementData() {
    return {
        type: INCREMENT_DATA

    };
}

export function decrementData() {
    return {
        type: DECREMENT_DATA

    };
}
export function getNumberOfVersions(data) {
    return {
        type: VERSION_NUMBER,
        data

    };
}
export function fetchKeyID(key) {
    return {
        type: FETCH_KEY_ID,
        key
    };
}

export function updateProfileData(profile,version) {
    return {
        type: UPDATE_PROFILE_DATA,
        profile,
        version
    };
}

export function fetchProfileData(url) {
    return (dispatch) => {

        fetch(url)
            .then((response) => {
                if (!response.ok){
                    throw Error (response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((profile) => {

                dispatch(fetchProfileDataSuccess(profile));
                dispatch(isProfileLoaded(true));
                dispatch(getNumberOfVersions(profile[0].data.length));

                }
            )

    }
}



