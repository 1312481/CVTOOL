import {combineReducers} from 'redux'
import {profile, profileHasErrored, profileIsLoaded, nameEditing} from './profile'


export default combineReducers ({
    profile,
    profileHasErrored,
    profileIsLoaded,
    nameEditing
});