const BASE_URL = 'http://localhost:3003/';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

//Получение
const getData = async (url) => {
    const resp = await fetch(`${BASE_URL}${url}`);

    if (!resp.ok) {
        throw new Error(`Запрос по URL ${`${BASE_URL}${url}`}, вернул статус ${resp.status}`);
    }

    return await resp.json();
}
//Обновление / Удаление
const updateData = async (url, data, method) => {
    const id = method === METHOD.POST ? '' : data.id;

    const resp = await fetch(`${BASE_URL}${url}/${id}`, {
        method: method,
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
//Получение
export const getTodoLists = async () => {
    return await getData('todoList');
}

export const getTodoItems = async () => {
    return await getData('todoItems');
}
//Добавление
export const addTodoLists = async (data) => {
    return await updateData('todoList', data, METHOD.POST);
}

export const addTodoItems = async (data) => {
    return await updateData('todoItems', data, METHOD.POST);
}
//Обновление
export const updateTodoLists = async (data) => {
    return await updateData('todoList', data, METHOD.PUT);
}

export const updateTodoItems = async (data) => {
    return await updateData('todoItems', data, METHOD.PUT);
}
//Удаление
export const deleteTodoLists = async (data) => {
    return await updateData('todoList', data, METHOD.DELETE);
}

export const deleteTodoItems = async (data) => {
    return await updateData('todoItems', data, METHOD.DELETE);
}