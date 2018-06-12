export const IS_PROFILE_ERROR = 'IS_PROFILE_ERROR'
export const IS_PROFILE_LOADED = 'IS_PROFILE_LOADED'
export const FETCH_PROFILE_DATA_SUCCESS = 'FETCH_PROFILE_DATA_SUCCESS'
export const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA'
export const FETCH_KEY_ID = 'FETCH_KEY_ID'
export function isProfileError(isError){
    return {
        type: IS_PROFILE_ERROR,
        isError
    };
}

export function isProfileLoaded(isLoaded){
    return {
        type: IS_PROFILE_LOADED,
        isLoaded
    };
}

export function fetchProfileDataSuccess(profile){
    return {
        type: FETCH_PROFILE_DATA_SUCCESS,
        profile
    };
}
export function fetchKeyID(key){
    return {
        type: FETCH_KEY_ID,
        key
    };
}

export function updateProfileData(profile){
    return {
        type: UPDATE_PROFILE_DATA,
        profile
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
                
                }
            )
            .catch(() => dispatch(isProfileError(true)));
    }
}



