import React from 'react';
import TodoLists from '../todo-lists';
import './styles.scss';

//Это не контейнер но расположен в каталоге container - т.к. в реальном приложении здесь запрашивалась бы информация о пользователе и т.д.
const App = () => {
    return (
        <div className="App">
            <TodoLists />
        </div>
    )
}

export default App;
