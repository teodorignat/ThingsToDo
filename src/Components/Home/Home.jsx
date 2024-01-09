import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList.jsx';
import logo2 from '../../img/logo2.png';
import refreshQuoteIcon from '../../img/refreshquote-icon.svg';
import addTaskIcon from '../../img/addtaskmodal-icon.svg';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasksRoute: 'inProgress',
        }
    }

    handleTasksRoute = (route) => {
        return this.setState({tasksRoute: route});
    }

    render() {
        const { tasksRoute } = this.state;
        const { tasks, user, quote, handleNewQuote, newQuote, openModal, handleDelBtn, handleCompleteBtn, handleNextStatusBtn, handlePrevStatusBtn} = this.props;
        return(
            <>
                <div className="home-tasks">
                    <div className="home-tasks-header">
                        <div className="home-tasks-title">
                            <img className='app-logo' src={logo2} alt="app logo" />
                            <p>Things To Do</p>
                            <button title='Add Task' className="addTask-btn" onClick={openModal}>
                                <img src={addTaskIcon} alt="" />
                                Add Task
                            </button>
                        </div>
                        <div className="tasks-nav">
                            <ul className='nav-list'>
                                <li 
                                    className={tasksRoute === 'pending' ? 'tasks-route active' : 'tasks-route'}
                                    onClick={() => this.handleTasksRoute('pending')}
                                >
                                    Pending
                                </li>
                                <li 
                                    className={tasksRoute === 'inProgress' ? 'tasks-route active' : 'tasks-route'}
                                    onClick={() => this.handleTasksRoute('inProgress')}
                                >
                                    In Progress
                                </li>
                                <li
                                    className={tasksRoute === 'completed' ? 'tasks-route active' : 'tasks-route'}
                                    onClick={() => this.handleTasksRoute('completed')}
                                >
                                    Completed
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="home-tasks-content">
                        <TaskList 
                            tasks={
                                tasksRoute === 'inProgress' 
                                ? tasks.inProgress 
                                : ( 
                                    tasksRoute === 'pending'
                                    ? tasks.pending
                                    : tasks.completed
                                ) 
                            } 
                            handleDelBtn={handleDelBtn}
                            handleCompleteBtn={handleCompleteBtn}
                            handleNextStatusBtn={handleNextStatusBtn}
                            handlePrevStatusBtn={handlePrevStatusBtn}
                            droppableId='taskList'
                        />
                    </div>
                </div>
                <div className="home-content">
                    <div className='home-content-header'>
                        <h1> Hi, {user.firstName}</h1>
                    </div>
                    <div className="quote-container">
                        <div className="quote-wrapper" style={{animation: newQuote ? 'slide-right .5s ease' : 'none'}}>
                            <p className='quote'><em>"{quote.quote}"</em></p>
                            <p className='author'>by <em>{quote.author}</em></p>
                        </div>  
                        <div className='refresh-btn-wrapper'>
                            <button title='Get another motivational quote' className='refreshQuote-btn' onClick={handleNewQuote}>
                                <img src={refreshQuoteIcon} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className='info-wrapper'>
                        <div className="home-info-box">
                            <h2>Completed tasks:</h2>
                            <div>
                                <p>{user.completedTasks}</p>
                            </div>
                        </div>
                        <div className="home-info-box">
                            <h2>Overdue tasks:</h2>
                            <div>
                                <p>{user.overDueTasks}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;