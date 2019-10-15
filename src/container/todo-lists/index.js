import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as listActions from '../../store/todo-lists/actions';
import * as itemsActions from '../../store/todo-items/actions';
import * as todoListsSelectors from '../../store/todo-lists/selectors';
import * as todoItemsSelectors from '../../store/todo-items/selectors';

import BtnsList from '../../component/btns-list';
import Button from '../../component/button';
import CtrlInput from '../../component/ctrl-input';
import TodoListOne from '../../component/todo-list-one';
import TodoItem from '../../component/todo-item';

import './styles.scss';

class TodoLists extends Component {

    constructor(props) {
        super(props);
        this.startListId = null;
        this.startItemId = null;
        this.endListId = null;
        this.endItemId = null;
        this.state = {
            editItemId: null,
            countSort: 0,
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(listActions.fetchLists());
        dispatch(itemsActions.fetchItems());
    }
    
    static getParentElement(currentEl, needClass) {
        while (!(currentEl && currentEl.classList.contains(needClass))) {
            currentEl = currentEl && currentEl.parentElement;
            if(currentEl === null) {
                break;
            }
        }
        return currentEl;
    }

    _getIndexById = (lists, ElemId) => {
        return lists.findIndex(el => el.id === ElemId);
    }

    _getItems = (listId) => {
        const { listsWithItems } = this.props;
        const list = listsWithItems.filter(list => list.id === listId);
        return list[0] && list[0].items;
    }

    _findElement = (listId, itemId) => {
        const { listsWithItems } = this.props;
        const list = listsWithItems.filter(list => list.id === listId);
        const item = list[0] && list[0].items.filter(item => item.id === itemId);
        return {...item[0]}
    }

    _cloneListWithNewItems = (list, listIndex, items) =>{
        return list.map((list, index) => {
            const cloneList = {}
            for (const key in list) {
                cloneList[key] = list[key];
            };
            if (index === listIndex) {
                cloneList.items = items;
            }
            return cloneList;
        });
    }

    onItemClick = (id) => {
        if (this.state.editItemId !== id) {
            this.setState({
                editItemId: id,
            })
        }
    }

    onAcceptBtnClick = async (ev, currentValue, itemId) => {
        ev.stopPropagation();
        const { dispatch, items } = this.props;
        const item = items.find(item => item.id === itemId);
        
        await dispatch(itemsActions.updateItem({
            ...item,
            name: currentValue,
        }));

        this.setState({
            editItemId: null,
        });
    }

    onCancellBtnClick = ev => {
        ev.stopPropagation();
        this.setState({
            editItemId: null,
        });
    }

    onDoneBtnClick = (ev, listId, itemId) => {
        ev.stopPropagation();
        const { dispatch } = this.props;
        const item = this._findElement(listId, itemId);
        
        dispatch(itemsActions.updateItem({
            ...item,
            isDone: true,
        }));
        
    }

    onDragStart = ev => {
        ev.dataTransfer.effectAllowed='move';

        const list = TodoLists.getParentElement(ev.target, 'TodoListOne');
        this.startListId = list && Number(list.getAttribute('list-id'));
        const item = TodoLists.getParentElement(ev.target, 'TodoItem');
        this.startItemId = item && Number(item.getAttribute('item-id'));
        
        return true;
    }

    onDellDrop = async ev => {
        ev.preventDefault();
        const { dispatch } = this.props;
        this.endListId = null;
        this.endItemId = null;
        await dispatch(itemsActions.deleteItem({
            id: this.startItemId,
        }));
        await dispatch(itemsActions.fetchItems());
    }

    onDrop = async ev => {
        ev.stopPropagation();
        ev.preventDefault();
        const { dispatch } = this.props;

        const targetEl = ev.target;
        const list = TodoLists.getParentElement(targetEl, 'TodoListOne');
        this.endListId = list && Number(list.getAttribute('list-id'));

        const startItemId = this.startItemId;
        const startListId = this.startListId;
        const endListId = this.endListId;
        
        const changeList = startListId !== endListId;
        if (changeList) {
            const startItem = this._findElement(startListId, startItemId);
            await dispatch(itemsActions.updateItem({
                ...startItem,
                list_id: endListId,
            }));
        } else {
            if (targetEl.classList.contains('TodoItem')) {
                this.endItemId = ev.target && Number(ev.target.getAttribute('item-id'));
                this.setState(state => ({
                    countSort: ++state.countSort,
                }));
            }
        }
    }

    onDragOver = ev => {
        ev.preventDefault();
    }

    onAddItem = async (name, listId) => {
        const { dispatch, items } = this.props;

        if (!name) return;
        
        let maxId = items.reduce((prev, item) => {
            if (item.id > prev) {
                return item.id;
            } else {
                return prev;
            }
        }, 0);
        
        await dispatch(itemsActions.addItem({
            "id": ++maxId,
            "list_id": Number(listId),
            "isDone": false,
            "name": name,
        }));

        await dispatch(itemsActions.fetchItems());
        
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

    sortList = (listsWithItems) => {
        const isOneList = this.startListId === this.endListId;
        const hasStartId = this.startItemId || this.startItemId === 0;
        const hasEndId = this.endItemId || this.endItemId === 0;

        if (isOneList && hasStartId && hasEndId) {
            const listIndex = this._getIndexById(listsWithItems, this.startListId);
            const currentItems = this._getItems(listIndex);
            const startIndex = this._getIndexById(currentItems, this.startItemId);
            const endIndex = this._getIndexById(currentItems, this.endItemId);

            if ((startIndex || startIndex === 0) && (endIndex || endIndex === 0)) {
                [currentItems[startIndex], currentItems[endIndex]] = [currentItems[endIndex], currentItems[startIndex]];
            }
        }

        return listsWithItems;
    }
    
    render() {
        const { listsWithItems } = this.props;
        const { editItemId } = this.state;

        const displayList = this.sortList(listsWithItems);
        
        return (
            <div className="TodoLists" onDrop={this.onDellDrop} onDragOver={this.onDragOver}>
                {this.renderHeader()}
                <div className="TodoLists__ul">
                    {displayList.map(list => {
                        return (
                            <TodoListOne 
                                key={list.id}
                                listName={list.name}
                                listId={list.id}
                                onDrop={this.onDrop}
                                onDragOver={this.onDragOver}
                                onAddItem={this.onAddItem}
                            >
                                {list.items.map(item => 
                                    <TodoItem 
                                        key={item.id}
                                        isDone={item.isDone}
                                        name={item.name}
                                        itemId={item.id}
                                        edit={item.id === editItemId}
                                        onItemClick={() => this.onItemClick(item.id)}
                                        onAcceptBtnClick={this.onAcceptBtnClick}
                                        onCancellBtnClick={this.onCancellBtnClick}
                                        onDoneBtnClick={ev => this.onDoneBtnClick(ev, list.id, item.id)}
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
        items: todoItemsSelectors.selectItems(state),
    }
}

export default connect(mapStateToProps)(TodoLists)
