import React from 'react';
import PropTypes from 'prop-types';

import BtnsList from '../../component/btns-list';
import Button from '../../component/button';
import CtrlInput from '../../component/ctrl-input';

import './styles.scss';

const TodoListOne = ({ listName, children, listId, onDrop, onDragOver, }) => {
    return (
        <div className="TodoListOne" list-id={listId} onDrop={onDrop} onDragOver={onDragOver}>
            <div className="TodoListOne__header">
                <div className="TodoListOne__title">{ listName }</div>
                <BtnsList>
                    <CtrlInput />
                    <Button name="Добавить" />
                </BtnsList>
            </div>
            <div className="TodoListOne__ul">
                {React.Children.map(children, el => el)}
            </div>
        </div>
    )
}

TodoListOne.propTypes = {
    listName: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    onDragOver: PropTypes.func,
    onDrop: PropTypes.func,
}

TodoListOne.defaultProps = {
    children: [],
    onDragOver: () => {},
    onDrop: () => {},
}

export default TodoListOne;
