const BASE_URL = 'http://localhost:3003/';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

const getData = async (url) => {
    const resp = await fetch(`${BASE_URL}${url}`);

    if (!resp.ok) {
        throw new Error(`Запрос по URL ${`${BASE_URL}${url}`}, вернул статус ${resp.status}`);
    }

    return await resp.json();
}

export const getTodoLists = async () => {
    return await getData('todoList');
}

export const getTodoItems = async () => {
    return await getData('todoItems');
}


const updateData = async (url, data) => {
    console.log("TCL: updateData -> data", data)
    const resp = await fetch(`${BASE_URL}${url}/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    if (!resp.ok) {
        throw new Error(`Запрос по URL ${`${BASE_URL}${url}`}, вернул статус ${resp.status}`);
    }

    return await resp.json();
}

export const updateTodoLists = async (data) => {
    return await updateData('todoList', data);
}

export const updateTodoItems = async (data) => {
    return await updateData('todoItems', data);
}