import * as api from '../../api';

const TYPES = {
    LIST_FETCH: 'LISTS_FETCH',
    LISTS_SUCCESS: 'LISTS_SUCCESS',
    LISTS_ERROR: 'LISTS_ERROR',
}

export function fetchLists() {
    return async(dispatch) => {
        dispatch({
            type: TYPES.LIST_FETCH,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        try {
            const todoLists = await api.getTodoLists();
            dispatch({
                type: TYPES.LISTS_SUCCESS,
                payload: {
                    fetching: false,
                    items: todoLists,
                },
            })
        } catch(err) {
            dispatch({
                type: TYPES.LISTS_ERROR,
                payload: {
                    fetching: false,
                    fetchError: err,
                },
            })
            console.error(err);
        }
    }
}