import {combineReducers} from 'redux'
import {profile, isProfileError, isProfileLoaded, user} from './profile'


export default combineReducers ({
    profile,
    user,
    isProfileError,
    isProfileLoaded,
});