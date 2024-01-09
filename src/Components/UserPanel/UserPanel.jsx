import React, { Component } from 'react';
import Home from '../Home/Home.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import AddTaskModal from '../AddTaskModal/AddTaskModal.jsx';
import TaskPage from '../TaskPage/TaskPage.jsx';
import { DragDropContext } from 'react-beautiful-dnd';
import './UserPanel.css';

class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            tasks: {
                pending: [],
                inProgress: [],
                completed: []
            },
            motivationalQuote: {
                quote: '',
                author: ''
            },
            newQuote: false,
            navRoute: 'home',
            addTask: false
        }
    }

    componentDidMount() {
        this.setState({user: this.props.user})
        fetch('https://api.quotable.io/quotes/random?tags=famous-quotes')
            .then(response => response.json())
            .then(quote => {
                this.setState(Object.assign(this.state.motivationalQuote, {
                    quote: quote[0].content,
                    author: quote[0].author
                }))
            })
        return fetch('http://localhost:3000/tasks', {
            method: 'post',
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                id: this.props.user.id
            })
        })
                .then(response => response.json())
                .then(tasks => {
                    return this.setState(Object.assign(this.state.tasks, {
                        pending: tasks.filter(task => task.status === 'pending'),
                        inProgress: tasks.filter(task => task.status === 'inProgress'),
                        completed: tasks.filter(task => task.status === 'completed')
                    }))
                })
                .catch(err => console.log('Unable to load tasks!'))
    }

    handleNewQuote = () => {
        fetch('https://api.quotable.io/quotes/random?tags=famous-quotes')
            .then(response => response.json())
            .then(quote => {
                this.setState(Object.assign(this.state.motivationalQuote, {
                    quote: quote[0].content,
                    author: quote[0].author
                }))
            })
            .catch(err => console.log('Unable to load motivational quote!'))
        return this.setState({newQuote: true}, () => {
            setTimeout(() => {
                this.setState({newQuote: false});
            }, 500)
        })
    }

    handleNavRoute = (route) => {
        this.setState({navRoute: route});
    }

    handleRefreshTasks = () => {
        return fetch('http://localhost:3000/tasks', {
            method: 'post',
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                id: this.props.user.id
            })
        })
                .then(response => response.json())
                .then(tasks => {
                    return this.setState(Object.assign(this.state.tasks, {
                        pending: tasks.filter(task => task.status === 'pending'),
                        inProgress: tasks.filter(task => task.status === 'inProgress'),
                        completed: tasks.filter(task => task.status === 'completed')
                    }))
                })
                .catch(err => console.log('Unable to load tasks!'))
    }

    handleModal = () => {
        return this.setState({addTask: !this.state.addTask});
    }

    handleDelBtn = (taskId) => {
        return fetch('http://localhost:3000/delbtn', {
            method: 'post',
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                taskId: taskId
            })
        })
            .then(response => response.json())
            .then(data => {
                this.handleRefreshTasks();
            })
            .catch(err => {
                alert('Unable to delete task!')
            })
    }

    handleCompleteBtn = (taskId) => {
        return fetch('http://localhost:3000/completetask', {
            method: 'put',
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                taskId: taskId,
                user_id: this.state.user.id
            })
        })
            .then(response => response.json())
            .then(completedTasks => {
                this.setState(Object.assign(this.state.user, {
                    completedTasks: completedTasks
                }))
                this.handleRefreshTasks();
            })
            .catch(err => {
                alert('Something went wrong, please try again!')
            })
    }

    handleNextStatusBtn = (taskId, status) => {
        if (status === 'pending') {
            const destination = 'inProgress';
            return fetch('http://localhost:3000/destination', {
                method: 'put',
                headers: { "Content-type": "application/json"},
                body: JSON.stringify({
                    taskId: taskId,
                    destination: destination
                })
            })
                .then(response => response.json())
                .then(newStatus => {
                    this.handleRefreshTasks();
                })
                .catch(err => {
                    alert("Sorry, we couldn't move the task to the next status, please try again! ")
                })
        } else if (status === 'inProgress') {
            const destination = 'completed';
            return fetch('http://localhost:3000/destination', {
                method: 'put',
                headers: { "Content-type": "application/json"},
                body: JSON.stringify({
                    taskId: taskId,
                    destination: destination
                })
            })
                .then(response => response.json())
                .then(newStatus => {
                    this.handleRefreshTasks();
                })
                .catch(err => {
                    alert("Sorry, we couldn't move the task to the next status, please try again! ")
                })
        }
    }

    handlePrevStatusBtn = (taskId, status) => {
        if (status === 'inProgress') {
            const destination = 'pending';
            return fetch('http://localhost:3000/destination', {
                method: 'put',
                headers: { "Content-type": "application/json"},
                body: JSON.stringify({
                    taskId: taskId,
                    destination: destination
                })
            })
                .then(response => response.json())
                .then(newStatus => {
                    this.handleRefreshTasks();
                })
                .catch(err => {
                    alert("Sorry, we couldn't move the task to the next status, please try again! ")
                })
        } else if (status === 'completed') {
            const destination = 'inProgress';
            return fetch('http://localhost:3000/destination', {
                method: 'put',
                headers: { "Content-type": "application/json"},
                body: JSON.stringify({
                    taskId: taskId,
                    destination: destination
                })
            })
                .then(response => response.json())
                .then(newStatus => {
                    this.handleRefreshTasks();
                })
                .catch(err => {
                    alert("Sorry, we couldn't move the task to the next status, please try again! ")
                })
        }
    }

    handleOnDragEnd = (source, destination) => {
        
    }

    render() {
        const { user, tasks,  navRoute, motivationalQuote, newQuote, addTask } = this.state;
        return (
            <div className="user-panel-wrapper">
                <DragDropContext onDragEnd={this.handleOnDragEnd}>
                    <div className="app-content">
                            {
                                navRoute === 'home'
                                ? <Home 
                                user={user} 
                                tasks={tasks} 
                                quote={motivationalQuote} 
                                handleNewQuote={this.handleNewQuote} 
                                newQuote={newQuote}
                                openModal={this.handleModal}
                                handleDelBtn={this.handleDelBtn}
                                handleCompleteBtn={this.handleCompleteBtn}
                                handleNextStatusBtn={this.handleNextStatusBtn}
                                handlePrevStatusBtn={this.handlePrevStatusBtn}
                                />
                                : <TaskPage 
                                tasks={tasks}
                                openModal={this.handleModal}
                                handleDelBtn={this.handleDelBtn}
                                handleCompleteBtn={this.handleCompleteBtn}
                                handleNextStatusBtn={this.handleNextStatusBtn}
                                handlePrevStatusBtn={this.handlePrevStatusBtn}
                                />
                            }
                        <Navigation user={this.props.user} handleNavRoute={this.handleNavRoute} changeRoute={this.props.changeRoute}/>
                    </div>
                </DragDropContext>
                {
                    addTask
                    ? <AddTaskModal 
                        close={this.handleModal}
                        user={user}
                        refreshTasks={this.handleRefreshTasks}
                        handleNavRoute={this.handleNavRoute}
                    />
                    : <></>
                }
            </div>
        );
    }
}

export default UserPanel;