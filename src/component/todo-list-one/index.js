import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BtnsList from '../../component/btns-list';
import Button from '../../component/button';
import CtrlInput from '../../component/ctrl-input';

import './styles.scss';

class TodoListOne extends Component {
    static propTypes = {
        listName: PropTypes.string.isRequired,
        listId: PropTypes.number.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]),
        onDragOver: PropTypes.func,
        onDrop: PropTypes.func,
        onAddItem: PropTypes.func.isRequired,
    }
    
    static defaultProps = {
        children: [],
        onDragOver: () => {},
        onDrop: () => {},
    }

    state = {
        currentValue: '',
    }
    
    onChange = (ev) => {
        this.setState({
            currentValue: ev.target.value,
        })
    }

    render() {
        const { listName, children, listId, onDrop, onDragOver, onAddItem } = this.props;
        const { currentValue } = this.state;
        return (
            <div className="TodoListOne" list-id={listId} onDrop={onDrop} onDragOver={onDragOver}>
                <div className="TodoListOne__header">
                    <div className="TodoListOne__title">{ listName }</div>
                    <BtnsList>
                        <CtrlInput currentValue={currentValue} onChange={this.onChange}/>
                        <Button name="Добавить" onClick={() => onAddItem(currentValue)}/>
                    </BtnsList>
                </div>
                <div className="TodoListOne__ul">
                    {React.Children.map(children, el => el)}
                </div>
            </div>
        )
    }
}

export default TodoListOne;
