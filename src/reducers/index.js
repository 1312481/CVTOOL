import {combineReducers} from 'redux'
import {profile, profileHasErrored, profileIsLoaded, nameEditing, profileUpdate, responseExp} from './profile'


export default combineReducers ({
    profile,
    profileHasErrored,
    profileIsLoaded,
    nameEditing,
    profileUpdate
});