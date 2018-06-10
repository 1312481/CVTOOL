import {combineReducers} from 'redux'
import {profile, isProfileError, isProfileLoaded} from './profile'


export default combineReducers ({
    profile,
    isProfileError,
    isProfileLoaded,
});