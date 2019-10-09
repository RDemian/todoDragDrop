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

class TodoLists extends Component {

    constructor(props) {
        super(props);
        this.startListId = null;
        this.startItemId = null;
        this.endListId = null;
        this.endItemId = null;
        this.state = {
            editItemId: null,
            sortlistsWithItems: null,
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(listActions.fetchLists());
        dispatch(itemsActions.fetchItems());
    }

    static isNull(e) {
        if (typeof e === 'null') {
            return true;
        }
        return false;
    }
    
    static getParentElement(currentEl, needClass) {
        while (!(currentEl && currentEl.classList.contains(needClass))) {
            currentEl = currentEl && currentEl.parentElement;
            if(TodoLists.isNull(currentEl)) {
                break;
            }
        }
        return currentEl;
    }

    getListIndex = (listsWithItems, ListId) => {
        return listsWithItems.findIndex(el => el.id === ListId);
    }

    getItems = (listId) => {
        const { listsWithItems } = this.props;
        const list = listsWithItems.filter(list => list.id === listId);
        return list[0] && list[0].items;
    }

    findElement = (listId, itemId) => {
        const { listsWithItems } = this.props;
        const list = listsWithItems.filter(list => list.id === listId);
        const item = list[0] && list[0].items.filter(item => item.id === itemId);
        return {...item[0]}
    }

    onItemClick = (id) => {
        console.log("TCL: TodoLists -> onItemClick -> onItemClick", id)
        if (this.state.editItemId !== id) {
            this.setState({
                editItemId: id,
            })
        }
    }

    onAcceptBtnClick = ev => {
        ev.stopPropagation();
    }

    onCancellBtnClick = ev => {
        ev.stopPropagation();
        this.setState({
            editItemId: null,
        })
    }

    onDoneBtnClick = (ev, listId, itemId) => {
        ev.stopPropagation();
        const { dispatch } = this.props;
        const item = this.findElement(listId, itemId);
        
        dispatch(itemsActions.updateItem({
            ...item,
            isDone: true,
        }))
        
    }

    onDragStart = ev => {
        ev.dataTransfer.effectAllowed='move';

        const list = TodoLists.getParentElement(ev.target, 'TodoListOne');
        this.startListId = list && Number(list.getAttribute('list-id'));
        const item = TodoLists.getParentElement(ev.target, 'TodoItem');
        this.startItemId = item && Number(item.getAttribute('item-id'));
        
        return true;
    }

    cloneListWithNewItems = (list, listIndex, items) =>{
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

    onDrop = async ev => {
        ev.stopPropagation();
        
        const { dispatch, listsWithItems } = this.props;
        
        const targetEl = ev.target;

        const list = TodoLists.getParentElement(targetEl, 'TodoListOne');
        this.endListId = list && Number(list.getAttribute('list-id'));
        
        if (targetEl.hasAttributes('item-id')) {
            const item = TodoLists.getParentElement(targetEl, 'TodoItem');
            this.endItemId = item && Number(item.getAttribute('item-id'));
        }

        const startItemId = this.startItemId;
        const startListId = this.startListId;
        const endListId = this.endListId;

        const startItem = this.findElement(startListId, startItemId);

        if (startListId !== endListId) {
            console.log('вход1');
            
            await dispatch(itemsActions.updateItem({
                ...startItem,
                list_id: endListId,
            }))
            
            /*
            const startItems = this.getItems(startListId);
            const cloneStartItem = {...startItems.find(el => el.id === startItemId)};
            const newEndItems = [...this.getItems(endListId), cloneStartItem];
            console.log("TCL: TodoLists -> newEndItems", newEndItems)
            const newStartItems = startItems.filter(el => el.id !== startItemId);
            console.log("TCL: TodoLists -> newStartItems", newStartItems)

            const startListIndex = this.getListIndex(listsWithItems, startListId);
            const startSortList = this.cloneListWithNewItems(listsWithItems, startListIndex, newStartItems);

            const endlistIndex = this.getListIndex(listsWithItems, endListId);
            const sortList = this.cloneListWithNewItems(startSortList, endlistIndex, newEndItems);
            
            this.setState({
                sortlistsWithItems: sortList,
            })
            */
        }
        
        if ((startListId === endListId) && (this.endItemId || this.endItemId === 0) && startItemId !== this.endItemId) {
            console.log('вход2');
            const items = this.getItems(endListId);
            
            const startPos = items.findIndex(el => el.id === startItemId);
            const endPos = items.findIndex(el => el.id === this.endItemId);
            [items[startPos], items[endPos]] = [items[endPos], items[startPos]];
            const listIndex = this.getListIndex(listsWithItems, endListId);
            const sortList = this.cloneListWithNewItems(listsWithItems, listIndex, items);
            
            this.setState({
                sortlistsWithItems: sortList,
            })
        }
    }
    //Пока не написал этот обработчик драг&дроп не работало, час искал в чем причина...
    onDragOver = ev => {
        ev.preventDefault();
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
        const { editItemId, sortlistsWithItems } = this.state;
        console.log("TCL: TodoLists -> render -> sortlistsWithItems", sortlistsWithItems)

        const displayList = sortlistsWithItems || listsWithItems;
        console.log("TCL: TodoLists -> render -> displayList", displayList)

        return (
            <div className="TodoLists">
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
                            >
                                {list.items.map((item, index) => 
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
    }
}

export default connect(mapStateToProps)(TodoLists)
