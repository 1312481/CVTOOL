import {combineReducers} from 'redux'
import {profile, isProfileError, isProfileLoaded, version} from './profile'


export default combineReducers ({
    profile,
    version,
    isProfileError,
    isProfileLoaded,
});