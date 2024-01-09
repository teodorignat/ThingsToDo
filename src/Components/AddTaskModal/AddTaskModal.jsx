import React, { Component } from 'react';
import modalIcon from '../../img/addtaskmodal-icon.svg';
import './AddTaskModal.css';

class AddTaskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskTitle: '',
            taskDescription: '',
            dueDate: ''
        }
    }
    
    handleAddTask = () => {
        const { taskTitle, taskDescription, dueDate} = this.state;
        if (taskTitle.length && taskDescription.length && dueDate.length) {
            return fetch('http://localhost:3000/addtask', {
                method: 'post',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    taskTitle: this.state.taskTitle,
                    taskDescription: this.state.taskDescription,
                    dueDate: this.state.dueDate,
                    id: this.props.user.id
                })
            })
                .then(response => response.json())
                .then(task => {
                    this.props.refreshTasks();
                    this.props.close();
                })
                .catch(err => {
                    console.error('Unable to add task!')
                    alert('Unable to add task!')
                })

        } else {
            alert('Please, fill up all the fields before adding the task!')
        }
    }

    handleTaskTitle = (e) => {
        return this.setState({taskTitle: e.target.value});
    }
    handleTaskDescription = (e) => {
        return this.setState({taskDescription: e.target.value});
    }
    handleDueDate = (e) => {
        return this.setState({dueDate: e.target.value});
    }

    render() {
        const {close} = this.props;
        return(
            <div className='modal-bg'>
                <div className="modal-container">
                    <div className='modal-header'>
                        <img src={modalIcon} alt="" />
                        <h1>Add Task</h1>
                    </div>
                    <div className="modal-body">
                        <div className='modal-field'>
                            <label htmlFor="taskTitle">Task title:</label>
                            <input id='taskTitle' type="text" onChange={this.handleTaskTitle}/>
                        </div>
                        <div className="modal-field">
                            <label htmlFor="taskDescription">Task description:</label>
                            <textarea id="taskDescription" rows='10' cols='40'onChange={this.handleTaskDescription}/>
                        </div>
                        <div className="modal-field">
                            <label htmlFor="taskDueDate">Due date:</label>
                            <input id="taskDueDate" type="date" onChange={this.handleDueDate}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="add-btn" onClick={this.handleAddTask}>Add Task</button>
                        <button className="close-btn" onClick={close}>Close</button>
                    </div>
                </div>
            </div>
        );
    }
}
    
export default AddTaskModal;
