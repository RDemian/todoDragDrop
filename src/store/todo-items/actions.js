import * as api from '../../api';

export const TYPES = {
    ITEMS_FETCH: 'ITEMS_FETCH',
    ITEMS_SUCCESS: 'ITEMS_SUCCESS',
    ITEMS_ERROR: 'ITEMS_ERROR',

    ITEM_UPDATE: 'ITEM_UPDATE',
    ITEM_UPDATE_SUCCESS: 'ITEM_UPDATE_SUCCESS',
    ITEM_UPDATE_ERROR: 'ITEM_UPDATE_ERROR',

    ITEM_DELETE: 'ITEM_UPDATE',
    ITEM_DELETE_SUCCESS: 'ITEM_DELETE_SUCCESS',
    ITEM_DELETE_ERROR: 'ITEM_DELETE_ERROR',
}

export function fetchItems() {
    return async(dispatch) => {
        dispatch({
            type: TYPES.ITEMS_FETCH,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        try {
            const todoItems = await api.getTodoItems();
            dispatch({
                type: TYPES.ITEMS_SUCCESS,
                payload: {
                    fetching: false,
                    items: todoItems,
                },
            })
        } catch(err) {
            dispatch({
                type: TYPES.ITEMS_ERROR,
                payload: {
                    fetching: false,
                    fetchError: err,
                },
            })
            console.error(err);
        }
    }
}

export function updateItem(data) {
    return async(dispatch) => {
        dispatch({
            type: TYPES.ITEM_UPDATE,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        try {
            const updateItem = await api.updateTodoItems(data);
            dispatch({
                type: TYPES.ITEM_UPDATE_SUCCESS,
                payload: {
                    fetching: false,
                    item: updateItem,
                },
            })
        } catch(err) {
            dispatch({
                type: TYPES.ITEM_UPDATE_ERROR,
                payload: {
                    fetching: false,
                    fetchError: err,
                },
            })
            console.error(err);
        }
    }
}

export function deleteItem(data) {
    return async(dispatch) => {
        dispatch({
            type: TYPES.ITEM_DELETE,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        try {
            const updateItem = await api.updateTodoItems(data);
            dispatch({
                type: TYPES.ITEM_DELETE_SUCCESS,
                payload: {
                    fetching: false,
                    item: updateItem,
                },
            })
        } catch(err) {
            dispatch({
                type: TYPES.ITEM_DELETE_ERROR,
                payload: {
                    fetching: false,
                    fetchError: err,
                },
            })
            console.error(err);
        }
    }
}