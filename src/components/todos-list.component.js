import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
            {props.todo.todo_description}
        </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
            {props.todo.todo_responsible}
        </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
            {props.todo.todo_priority}
        </td>
        <td>
            <Link to={"/edit/" + props.todo._id} >Edit</Link>
        </td>
    </tr>
)

export default class TodoList extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        this._isMounted = true;
        axios.get('http://localhost:4000/todos')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/todos')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
        return(
            <div>
                <h3>Todo List</h3>
                <table className="table table-striped" style ={{ marginTop: '20px'}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}