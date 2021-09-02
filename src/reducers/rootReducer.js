import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';
import { uiReducer } from './uiReducer';

export const rootReducer=combineReducers({
    ui:uiReducer,
    // TODO:CalendarReducer
    calendar:calendarReducer,
    // TODO:AUTHReducer
    auth:authReducer
})