const BASE_URL = 'http://localhost:3000/';

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

export const getTodos = async () => {
    return await getData('todos');
}