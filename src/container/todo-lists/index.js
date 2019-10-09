import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as listActions from '../../store/todo-lists/actions';
import * as itemsActions from '../../store/todo-items/actions';
import * as todoListsSelectors from '../../store/todo-lists/selectors';

import BtnsList from '../../component/btns-list';
import Button from '../../component/button';
import CtrlInput from '../../component/ctrl-input';
import TodoListOne from '../../component/todo-list-one';

import './styles.scss';

class TodoList extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        //dispatch(listActions.fetchLists());
        dispatch(itemsActions.fetchItems());
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
        return (
            <div className="TodoLists">
                {this.renderHeader()}
                <div className="TodoLists__ul">
                    <TodoListOne>

                    </TodoListOne>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todoLists: todoListsSelectors.selectItems(state),
    }
}

export default connect(mapStateToProps)(TodoList)
