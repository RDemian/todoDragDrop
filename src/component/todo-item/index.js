import React from 'react';
import PropTypes from 'prop-types';

import BtnsList from '../../component/btns-list';
import Button from '../../component/button';
import CtrlInput from '../../component/ctrl-input';

import './styles.scss';

const TodoItem = ({
        edit,
        name,
        position,
        onItemClick,
        onAcceptBtnClick,
        onCancellBtnClick,
        onDoneBtnClick,
        onDragStart,
        itemId,
        onDragOver,
        onDrop,
    }) => {

    return (
        <div className="TodoItem"
            draggable="true"
            droppable="true"
            onClick={onItemClick}
            item-id={itemId}
            item-name={name}
            position={position} 
            onDragStart={onDragStart}
            onDrop={(e)=>onDrop(e)}
            onDragOver={onDragOver}
        >
            {!edit && name}
            {edit && <BtnsList>
                <CtrlInput currentValue={name}/>
                <Button name="Принять" onClick={onAcceptBtnClick}/>
                <Button name="Отменить" onClick={onCancellBtnClick}/>
                <Button name="Завершить" onClick={onDoneBtnClick}/>
            </BtnsList>}
        </div>
    )
}

TodoItem.propTypes = {
    name: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func,
    onAcceptBtnClick: PropTypes.func,
    onCancellBtnClick: PropTypes.func,
    onDoneBtnClick: PropTypes.func,
    position: PropTypes.number.isRequired,
}

TodoItem.defaultProps = {
    onItemClick: () => {},
    onAcceptBtnClick: () => {},
    onCancellBtnClick: () => {},
    onDoneBtnClick: () => {},
}

export default TodoItem;
