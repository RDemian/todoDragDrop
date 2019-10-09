import get from 'lodash/get';
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
        case TYPES.ITEMS_UPDATE:
            return {...state, ...action.payload}
        case TYPES.ITEMS_UPDATE_SUCCESS:
            const newItemId = get(action.payload, 'item.id');
            const cloneItemsArray = state.items.map( item => {
                if (item.id === newItemId) {
                    return action.payload.item;
                };

                const cloneItem = {};
                for (var key in item) {
                    cloneItem[key] = item[key];
                };
                return cloneItem;
            })
            
            return {...state, fetching: action.payload.fetching, items: cloneItemsArray}
        case TYPES.ITEMS_UPDATE_ERROR:
            return {...state, ...action.payload}
        default:
            return state;
    }
}