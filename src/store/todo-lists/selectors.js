export const selectItems = state => {
    return state.todoLists.items;
}

export const selectListsWithItems = state => {
    const lists = state.todoLists.items;
    const items = state.todoItems.items;
    const listsWithItems = lists.map(list => {
        return {
            ...list,
            items: items.filter(item => item.list_id === list.id).sort((a, b) => {
                if (a.isDone && !b.isDone) return 1;
                if (!a.isDone && b.isDone) return -1;
                return 0;
            }),
        }
    })
    
    return listsWithItems;
}