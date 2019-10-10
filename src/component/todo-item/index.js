import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BtnsList from '../../component/btns-list';
import Button from '../../component/button';
import CtrlInput from '../../component/ctrl-input';

import './styles.scss';

class TodoItem extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        edit: PropTypes.bool.isRequired,
        onItemClick: PropTypes.func,
        onAcceptBtnClick: PropTypes.func,
        onCancellBtnClick: PropTypes.func,
        onDoneBtnClick: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragOver: PropTypes.func,
        onDrop: PropTypes.func,
    }
    
    static defaultProps = {
        onItemClick: () => {},
        onAcceptBtnClick: () => {},
        onCancellBtnClick: () => {},
        onDoneBtnClick: () => {},
        onDragStart: () => {},
        onDragOver: () => {},
        onDrop: () => {},
    }

    state = {
        currentValue: this.props.name,
    }
    
    onChange = (ev) => {
        this.setState({
            currentValue: ev.target.value,
        })
    }

    render() {
        const {
            edit,
            itemId,
            name,
            isDone,
            onItemClick,
            onAcceptBtnClick,
            onCancellBtnClick,
            onDoneBtnClick,
            onDragStart,
            onDragOver,
            onDrop,
        } = this.props;

        const { currentValue } = this.state;

        return (
            <div className={`TodoItem ${isDone && 'TodoItem__done'}`}
                draggable={!isDone}
                droppable="true"
                onClick={onItemClick}
                item-id={itemId}
                onDragStart={onDragStart}
                onDrop={(e)=>onDrop(e)}
                onDragOver={onDragOver}
            >
                {(!edit || isDone) && name}
                {!isDone && edit && <BtnsList>
                    <CtrlInput currentValue={currentValue} onChange={this.onChange}/>
                    <Button name="Принять" onClick={(ev) => onAcceptBtnClick(ev, currentValue, itemId)}/>
                    <Button name="Отменить" onClick={onCancellBtnClick}/>
                    <Button name="Завершить" onClick={onDoneBtnClick}/>
                </BtnsList>}
            </div>
        )
    }
}

export default TodoItem;
