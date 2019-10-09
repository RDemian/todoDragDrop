const initialState = {
    fetching: false,
    fetchError: null,
    items: [],
}

export default function reducer(state = initialState, action) {
    if (action.payload) {
        return {...state, ...action.payload}
    } else {
        return state;
    }
}