export const selectItems = state => {
    return state.todoLists.items;
}

export const selectListsWithItems = state => {
console.log("SELECTOR-1: state", state)
    const lists = state.todoLists.items;
    const items = state.todoItems.items;
    const listsWithItems = lists.map(list => {
        return {
            ...list,
            items: items.filter(item => item.list_id === list.id).sort((a, b) => Number(a.position) - Number(b.position)),
        }
    })
    
    return listsWithItems;
}