import {combineReducers, createStore} from "redux";
import labReducer from "./lab-reducer";


let reducers = combineReducers({
    // profilePage: profileReducer,
    // dialogsPage: dialogReducer,
    // usersPage: usersReducer,
    // auth: authReducer,
    lab: labReducer,
    // app: appReducer
});

let store = createStore(reducers);

window.store = store;

export default store;