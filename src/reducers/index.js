import {combineReducers} from 'redux'
import {profile, profileHasErrored, profileIsLoaded, nameEditing, profileUpdate} from './profile'


export default combineReducers ({
    profile,
    profileHasErrored,
    profileIsLoaded,
    nameEditing,
    profileUpdate
});