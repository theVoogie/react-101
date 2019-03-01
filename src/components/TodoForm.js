import React, {Component} from 'react';
import {updateInput} from '../actions';
import {connect} from "react-redux";
import {saveTodo, fetchTodos, toggleCalendar} from "../reducers/todoReducer";
import Calendar from 'react-calendar';
import CalendarGrid from './CalendarGrid';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

/**
 * Oh dang! Form is not functioning as well :(
 * TODO: Figure out how to connect this component
 * to state and which fields of state we actually dependant on
 */
let dt = "";

class TodoForm extends Component {
    onSubmit = (event) => {
        event.preventDefault();
        //  TODO: figure out how the make this stuff work again
        if (this.props.currentTodo.length === 0) {
            alert('please enter anything to add')
        } else
            this.props.saveTodo(this.props.currentTodo, dt)
    };


    render() {
        return (
            <div>
                <button onClick={() => {
                    if (this.props.history.location.pathname.length > 2) {
                        let f = new Date(this.props.history.location.pathname.substring(1));
                        f.setDate(f.getDate() - 1);
                        this.props.history.push("/" + (f.getFullYear()) + '-' + (f.getMonth() + 1) + '-' + f.getDate())
                    }
                }}>◀
                </button>
                <button onClick={() => {
                    this.props.toggleCalendar()
                }}> Show Grid View
                </button>

                <button onClick={() => {
                    if (this.props.history.location.pathname.length > 2) {
                        let f = new Date(this.props.history.location.pathname.substring(1));
                        f.setDate(f.getDate() + 1);
                        this.props.history.push("/" + (f.getFullYear()) + '-' + (f.getMonth() + 1) + '-' + f.getDate())
                    }
                }}> ▶
                </button>
                <Calendar className={"hidden"}
                          onChange={(e) => {
                              this.props.history.push("/" + (e.getFullYear()) + '-' + (e.getMonth() + 1)
                                  + '-' + e.getDate());
                              this.props.toggleCalendar()
                          }}/>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        value={this.props.currentTodo}
                        onChange={(event) => {
                            this.props.updateInput(event.target.value);
                            dt = this.props.history.location.pathname.substring(1)
                        }}/>
                    <button type="submit">Add Task</button>
                    <Link to="/" className="back-btn">Back</Link>
                </form>
                <CalendarGrid/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentTodo: state.currentTodo,
        calenderFilter: state.calenderFilter,
    }
};

export default connect(mapStateToProps, {updateInput, saveTodo, fetchTodos, toggleCalendar})(
    withRouter(TodoForm))
