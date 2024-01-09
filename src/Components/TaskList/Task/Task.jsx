import React from 'react';
import completedIcon from '../../../img/completed-icon.svg';
import pendingIcon from '../../../img/pending-icon.svg';
import inProgressIcon from '../../../img/inProgress-icon.svg';
import deleteIcon from '../../../img/delete-icon.svg';
import arrowIcon from '../../../img/arrows-icon.svg';
import './Task.css';

const Task = ( { taskId, status, taskTitle, taskDescription, dueDate, handleDelBtn, handleCompleteBtn, handleNextStatusBtn, handlePrevStatusBtn } ) => { 

    return(
        <>
            <div 
                className={
                    status === 'completed' 
                    ? 'task-header completed' 
                    : (
                            status === 'inProgress'
                            ? 'task-header inProgress'
                            : 'task-header'
                    )
                }
            >
                <div className='task-title'>
                    <img
                        src={
                            status === 'pending'
                            ? pendingIcon 
                            : (
                                status === 'inProgress'
                                ? inProgressIcon 
                                : completedIcon
                            )
                        } 
                        alt="" 
                    />
                    <h1>{taskTitle}</h1>
                </div>
                <div className="task-info">
                    <div className="info-box">
                        <p className="due-date">Due: <br/>{dueDate}</p>
                    </div>
                </div>
                <button 
                    title='Delete task' 
                    className='delete-btn'
                    onClick={() => handleDelBtn(taskId)}
                >
                    <img src={deleteIcon} alt="" />
                </button>
            </div>
            <div className='task-content'>
                <div className='task-body'>
                    {
                        status !== 'pending'
                        ? <button 
                            title='Previous status of the task' className='prev-status-btn'
                            onClick={() => handlePrevStatusBtn(taskId, status)}
                        >
                            <img src={arrowIcon} alt="" />
                        </button>
                        : <></>
                    }
                    
                    <div className="task-description">
                        <p> 
                            {taskDescription}
                        </p>
                    </div>
                    {
                        status !== 'completed'
                        ? <button 
                            title='Next status of the task' 
                            className='next-status-btn'
                            onClick={() => handleNextStatusBtn(taskId, status)}
                        >
                            <img src={arrowIcon} alt="" />
                        </button>
                        : <></>
                    }
                </div>
                {
                    status === 'completed'
                    ?<button className='complete-btn' onClick={() => handleCompleteBtn(taskId)}>
                        <p title='Press to complete task'> Press to complete task! </p>
                    </button>
                    : undefined
                }
            </div>
        </>
    );
}


export default Task;