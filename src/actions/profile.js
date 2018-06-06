export function profileHasErrored(bool){
    return {
        type: 'PROFILE_HAS_ERRORED',
        hasErrored: bool
    };
}


export function profileIsLoaded(bool){
    return {
        type: 'PROFILE_IS_LOADED',
        isLoaded: bool
    };
}
export function nameEditing(bool){
    return {
        type: 'NAME_IS_EDITING',
        isBeingEdited: bool
    };
}

export function profileFetchDataSuccess(profile){
    return {
        type: 'PROFILE_FETCH_DATA_SUCCESS',
        profile
    };
}

export function profileUpdateData(profile){
    return {
        type: 'PROFILE_UPDATE_DATA',
        profile
    };
}


export function errorAfterFiveSeconds(){
    return (dispatch) => {
        setTimeout(() => {
            dispatch(profileHasErrored(true));
        }, 5000);
    };
}

export function profileFetchData(url) {
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
                
                dispatch(profileFetchDataSuccess(profile));
                dispatch(profileIsLoaded(true));
                }
            )
            .catch(() => dispatch(profileHasErrored(true)));
    }
}



