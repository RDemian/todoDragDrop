import React from 'react';
import PropTypes from 'prop-types';

import BtnsList from '../../component/btns-list';
import Button from '../../component/button';
import CtrlInput from '../../component/ctrl-input';

import './styles.scss';

const TodoListOne = ({ listName, children, listId }) => {
    return (
        <div className="TodoListOne" list-id={listId} list-name={listName}>
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
    listId: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
}

TodoListOne.defaultProps = {
    children: [],
}

export default TodoListOne;
