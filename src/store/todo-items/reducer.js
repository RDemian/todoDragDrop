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
        //update
        case TYPES.ITEM_UPDATE:
            return {...state, ...action.payload}
        case TYPES.ITEM_UPDATE_SUCCESS:
            const updateItemId = get(action.payload, 'item.id');
            const updateItemsArray = state.items.map( item => {
                if (item.id === updateItemId) {
                    return action.payload.item;
                };

                const cloneItem = {};
                for (var key in item) {
                    cloneItem[key] = item[key];
                };
                return cloneItem;
            })
            
            return {...state, fetching: action.payload.fetching, items: updateItemsArray}
        case TYPES.ITEM_UPDATE_ERROR:
            return {...state, ...action.payload}
        //delete
        case TYPES.ITEM_DELETE:
            return {...state, ...action.payload}
        case TYPES.ITEM_DELETE_SUCCESS:
            const deleteItemId = get(action.payload, 'item.id');
            const deleteItemsArray = state.items.map( item => {
                const cloneItem = {};
                for (var key in item) {
                    cloneItem[key] = item[key];
                };
                return cloneItem;
            })
            return {...state,
                fetching: action.payload.fetching,
                items: deleteItemsArray.filter(item => item.id !== deleteItemId)}
        case TYPES.ITEM_DELETE_ERROR:
            return {...state, ...action.payload}

        default:
            return state;
    }
}