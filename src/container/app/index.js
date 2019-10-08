import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as api from '../../api';
import TodoList from '../todo-list';
import * as actions from '../../store/todo-lists/actions';
import * as todoListsSelectors from '../../store/todo-lists/selectors';


const fun = async () => {
    try {
        const resp = await api.getTodoLists();
        console.log("!!! TCL: fun - resp", resp);
    } catch(err) {
        console.error(err);
    }

    
    /*
    api.getTodoLists()
        .then(list => {
            console.log("TCL: App -> componentDidMount -> list", list)
        })
        .catch((err)=>{
            console.log("Ошибка", err)
        })
        */
}

class App extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(actions.fetchLists());
    }

    render() {
        return (
            <div className="App">
                Это апп
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todoLists: todoListsSelectors.selectItems(state),
    }
}

export default connect(mapStateToProps)(App)
