import { TYPES } from './actions';

const initialState = {
    fetching: false,
    fetchError: null,
    items: [],
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case TYPES.ITEMS_FETCH:
            return {...state, ...action.payload}
        case TYPES.ITEMS_SUCCESS:
            return {...state, ...action.payload}
        case TYPES.ITEMS_ERROR:
            return {...state, ...action.payload}
        default:
            return state;
    }
}