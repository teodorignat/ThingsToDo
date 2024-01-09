import React from 'react';
import TaskList from '../TaskList/TaskList.jsx';
import addTaskIcon from '../../img/addtaskmodal-icon.svg';
import pendingIcon from '../../img/pending-icon.svg';
import inProgressIcon from '../../img/inProgress-icon.svg';
import completedIcon from '../../img/completed-icon.svg';
import './TaskPage.css';

const TaskPage = ({tasks, handleDelBtn, handleCompleteBtn, openModal, handleNextStatusBtn, handlePrevStatusBtn}) => {
    return(
        <div className="taskPage-container">
            <div className="tasks-wrapper">
                <div className="tasks-header">
                    <div className="title-container">
                        <img className='task-icon' src={pendingIcon} alt="" />
                        <h1> Pending Tasks </h1>
                    </div>
                    <button title='Add Task' className="addTask-btn" onClick={openModal}>
                        <img src={addTaskIcon} alt="" />
                        Add Task
                    </button>
                </div>
                <TaskList 
                    tasks={tasks.pending} 
                    handleDelBtn={handleDelBtn}
                    handleCompleteBtn={handleCompleteBtn}
                    handleNextStatusBtn={handleNextStatusBtn}
                    droppableId='pending'
                    />
            </div>
            <div className="tasks-wrapper">
                <div className="tasks-header">
                    <img className='task-icon' src={inProgressIcon} alt="" />
                    <h1> In Progress Tasks </h1>
                </div>
                <TaskList 
                    tasks={tasks.inProgress} 
                    handleDelBtn={handleDelBtn}
                    handleCompleteBtn={handleCompleteBtn}
                    handleNextStatusBtn={handleNextStatusBtn}
                    handlePrevStatusBtn={handlePrevStatusBtn}
                    droppableId='inProgress'
                />
            </div>
            <div className="tasks-wrapper">
                <div className="tasks-header">
                    <img className='task-icon' src={completedIcon} alt="" />
                    <h1> Completed Tasks </h1>
                </div>
                <TaskList 
                    tasks={tasks.completed} 
                    handleDelBtn={handleDelBtn}
                    handleCompleteBtn={handleCompleteBtn}
                    handlePrevStatusBtn={handlePrevStatusBtn}
                    droppableId='completed'
                />
            </div>
        </div>
    );
}

export default TaskPage;