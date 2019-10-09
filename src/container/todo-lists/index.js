import React, {Component} from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as listActions from '../../store/todo-lists/actions';
import * as itemsActions from '../../store/todo-items/actions';
import * as todoListsSelectors from '../../store/todo-lists/selectors';

import BtnsList from '../../component/btns-list';
import Button from '../../component/button';
import CtrlInput from '../../component/ctrl-input';
import TodoListOne from '../../component/todo-list-one';
import TodoItem from '../../component/todo-item';

import './styles.scss';

function isNull() {
    if (typeof a === "null") {
        return true;
    }
    return false;
}

function getParentElement(currentEl, needClass) {
    while (!(currentEl.classList.contains(needClass))) {
        currentEl = currentEl.parentElement;
        if(isNull(currentEl)) {
            break;
        }
    }
    return currentEl;
}

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.weekList = document.querySelector('.week__list');
        this.weekItems = document.querySelectorAll('.week__item');
        this.startContainer = null; // строка списка откуда забрали элемент
        this.targetContainer = null; // целевой контейнер
        this.moveElement = null; // перемещаемый элемент
        this.replacedElement = null; // замещаемый элемент
        this.state = {
            editItemId: '0',
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(listActions.fetchLists());
        dispatch(itemsActions.fetchItems());
    }

    onItemClick = (id) => {
        if (this.state.editItemId !== id) {
            this.setState({
                editItemId: id,
            })
        }
    }

    onAcceptBtnClick = e => {
        e.stopPropagation();
        console.log('AcceptClick***', e);
    }

    onCancellBtnClick = e => {
        e.stopPropagation();
        this.setState({
            editItemId: null,
        })
    }

    onDoneBtnClick = e => {
        e.stopPropagation();
    }

    renderHeader() {
        return (
            <div className="TodoLists__header">
                <div className="TodoLists__title">TodoLists</div>
                <BtnsList>
                    <CtrlInput />
                    <Button name="Добавить" />
                </BtnsList> 
            </div>
        )
    }

    render() {
        const { listsWithItems } = this.props;
        const { editItemId } = this.state;

        return (
            <div className="TodoLists">
                {this.renderHeader()}
                <div className="TodoLists__ul" onDrop={this.onDragDrop}>
                    {listsWithItems.map(list => {
                        return (
                            <TodoListOne 
                                key={list.id}
                                listName={list.name}
                                onDragEnter={this.onDragEnter}
                                
                                
                            >
                                {list.items.map((item, index) => 
                                    <div key={item.id} className="TodoLists__itemContainer" onDrop={this.onDragDrop} droppable="true">
                                        <TodoItem 
                                            position={index}
                                            name={item.name}
                                            edit={item.id === editItemId}
                                            onItemClick={() => this.onItemClick(item.id)}
                                            onAcceptBtnClick={this.onAcceptBtnClick}
                                            onCancellBtnClick={this.onCancellBtnClick}
                                            onDoneBtnClick={this.onDoneBtnClick}
                                            onDragStart={this.onDragStart}
                                            onDrop={this.onDragDrop}
                                        />
                                    </div>
                                )}
                            </TodoListOne>
                        )
                    })}
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listsWithItems: todoListsSelectors.selectListsWithItems(state),
    }
}

export default connect(mapStateToProps)(TodoList)
