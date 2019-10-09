import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as listActions from '../../store/todo-lists/actions';
import * as itemsActions from '../../store/todo-items/actions';
import * as todoListsSelectors from '../../store/todo-lists/selectors';

import BtnsList from '../../component/btns-list';
import Button from '../../component/button';
import CtrlInput from '../../component/ctrl-input';
import TodoListOne from '../../component/todo-list-one';
import TodoItem from '../../component/todo-item';

import './styles.scss';

function isNull(e) {
    if (typeof e === 'null') {
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
class TodoLists extends Component {

    constructor(props) {
        super(props);
        this.startContainer = null;
        this.moveElement = null;
        this.targetContainer = null;
        this.replacedElement = null;
        this.state = {
            editItemId: null,
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

    onDragStart = ev => {
        ev.dataTransfer.effectAllowed='move';

        this.startContainer = getParentElement(ev.target, 'TodoListOne');
        this.moveElement = getParentElement(ev.target, 'TodoItem');
        
        return true;
    }
    onDragEnter = e => {
        console.log("TCL: TodoList -> onDragEnter = e => {", e )
    }
    onDrop = ev => {
        const { dispatch } = this.props;
        this.targetContainer = getParentElement(ev.target, 'TodoListOne');
        this.replacedElement = getParentElement(ev.target, 'TodoItem');
        
        if (this.moveElement !== this.replacedElement) {
            const startItemId = this.moveElement.getAttribute('item-id');
            const startName = this.moveElement.getAttribute('item-name');
            console.log("TCL: startName", startName)
            const startItemPosition = this.moveElement.getAttribute('position');
            console.log("TCL: startItemPosition", startItemPosition)
            const startListId = this.startContainer.getAttribute('list-id');
            

            const targetItemId = this.replacedElement.getAttribute('item-id');
            const targetName = this.replacedElement.getAttribute('item-name');
            console.log("TCL: targetName", targetName)
            const targetItemPosition = this.replacedElement.getAttribute('position');
            console.log("TCL: targetItemPosition", targetItemPosition)
            const targetListId = this.targetContainer.getAttribute('list-id');
            

            dispatch(itemsActions.updateItem({
                "id": startItemId,
                "list_id": targetListId,
                "position": Number(targetItemPosition),
                "name": startName,
            })).then(() => {
                dispatch(itemsActions.updateItem({
                    "id": targetItemId,
                    "list_id": startListId,
                    "position": Number(startItemPosition),
                    "name": targetName,
                }))
            })
        }
    }
    onDrag = e => {
        console.log("TCL: TodoList -> onDrag = e => {", e )
    }
    onDragOver = e => {
        e.preventDefault();
    }

    render() {
        const { listsWithItems } = this.props;
        const { editItemId } = this.state;

        return (
            <div className="TodoLists">
                {this.renderHeader()}
                <div className="TodoLists__ul">
                    {listsWithItems.map(list => {
                        return (
                            <TodoListOne 
                                key={list.id}
                                listName={list.name}
                                listId={list.id}
                                onDragEnter={this.onDragEnter}
                                onDragOver={this.onDragOver}
                            >
                                {list.items.map((item, index) => 
                                    <TodoItem 
                                        key={`${item.id}/${item.position}`}
                                        position={index}
                                        name={item.name}
                                        itemId={item.id}
                                        edit={item.id === editItemId}
                                        onItemClick={() => this.onItemClick(item.id)}
                                        onAcceptBtnClick={this.onAcceptBtnClick}
                                        onCancellBtnClick={this.onCancellBtnClick}
                                        onDoneBtnClick={this.onDoneBtnClick}
                                        onDragStart={this.onDragStart}
                                        onDrop={this.onDrop}
                                        onDragOver={this.onDragOver}
                                    />
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

export default connect(mapStateToProps)(TodoLists)
