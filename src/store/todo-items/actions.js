import * as api from '../../api';

const TYPES = {
    ITEMS_FETCH: 'ITEMS_FETCH',
    ITEMS_SUCCESS: 'ITEMS_SUCCESS',
    ITEMS_ERROR: 'ITEMS_ERROR',
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