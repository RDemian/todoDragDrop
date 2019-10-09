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
        this.startContainer = null;
        this.startElement = null;
        this.targetContainer = null;
        this.targetElement = null;
        this.state = {
            editItemId: null,
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

    findElement = (listId, itemId) => {
        const { listsWithItems } = this.props;
        const list = listsWithItems.filter(list => list.id === listId);
        const item = list[0] && list[0].items.filter(item => item.id === itemId)
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

        this.startContainer = TodoLists.getParentElement(ev.target, 'TodoListOne');
        this.startElement = TodoLists.getParentElement(ev.target, 'TodoItem');
        
        return true;
    }

    onDrop = async ev => {
        console.log("TCL: TodoLists -> ev", ev.target);
        ev.stopPropagation();
        const { dispatch, listsWithItems } = this.props;
        console.log("TCL: TodoLists -> listsWithItems", listsWithItems)
        this.targetContainer = TodoLists.getParentElement(ev.target, 'TodoListOne');
        //this.targetElement = TodoLists.getParentElement(ev.target, 'TodoItem');
        
        if (this.startElement !== this.targetElement) {
            const startItemId = Number(this.startElement.getAttribute('item-id'));
            const startListId = Number(this.startContainer.getAttribute('list-id'));
            const endListId = Number(this.targetContainer.getAttribute('list-id'));
            const startItem = this.findElement(startListId, startItemId);

            await dispatch(itemsActions.updateItem({
                ...startItem,
                list_id: endListId,
            }))
            
            /*
            const startName = this.startElement.getAttribute('item-name');
            const startItemPosition = this.startElement.getAttribute('position');
            
            

            const targetItemId = this.targetElement.getAttribute('item-id');
            const targetName = this.targetElement.getAttribute('item-name');
            const targetItemPosition = this.targetElement.getAttribute('position');
            const targetListId = this.targetContainer.getAttribute('list-id');
            */
            /*
            await dispatch(itemsActions.updateItem({
                "id": startItemId,
                "list_id": targetListId,
                "name": startName,
            }))

            await dispatch(itemsActions.updateItem({
                "id": targetItemId,
                "list_id": targetListId,
                "name": targetName,
            }))
            */
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
