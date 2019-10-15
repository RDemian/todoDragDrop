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
        doneSort: false,
    }

    onDoneSort = () => {
        this.setState(state => ({
            doneSort: !state.doneSort,
        }));
    }
    
    onChange = (ev) => {
        this.setState({
            currentValue: ev.target.value,
        })
    }

    sortDone = (items) => {
        const { doneSort } = this.state;
        
        if (!doneSort) return items;

        return items.sort((a, b) => {
            if (a.props.isDone && !b.props.isDone) return -1;
            if (!a.props.isDone && b.props.isDone) return 1;
            return 0;
        });
    }

    render() {
        const { listName, children, listId, onDrop, onDragOver, onAddItem } = this.props;
        const { currentValue } = this.state;
        const displayChildren = this.sortDone(React.Children.toArray(children));
        return (
            <div className="TodoListOne" list-id={listId} onDrop={onDrop} onDragOver={onDragOver}>
                <div className="TodoListOne__header">
                    <div className="TodoListOne__title">{ listName }</div>
                    <BtnsList>
                        <CtrlInput currentValue={currentValue} onChange={this.onChange}/>
                        <Button name="Добавить" onClick={() => onAddItem(currentValue, listId)}/>
                        <Button name="Сортировать" onClick={this.onDoneSort}/>
                    </BtnsList>
                </div>
                <div className="TodoListOne__ul">
                    {React.Children.map(displayChildren, el => el)}
                </div>
            </div>
        )
    }
}

export default TodoListOne;
