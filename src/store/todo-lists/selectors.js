export const selectItems = state => {
    return state.todoLists.items;
}

export const selectListsWithItems = state => {
    const lists = state.todoLists.items;
    const items = state.todoItems.items;
    const listsWithItems = lists.map(list => {
        console.log("TCL: list", list)    
        return {
            ...list,
            items: items.filter(item => item.list_id === list.id),
        }
    })
    
    return listsWithItems;
}