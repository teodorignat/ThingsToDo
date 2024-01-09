import React from 'react';
import Task from './Task/Task.jsx';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskList.css';


const TaskList = ({ tasks, handleDelBtn, handleCompleteBtn, handleNextStatusBtn, handlePrevStatusBtn, droppableId }) => {

    return(
        <>
            <Droppable 
                droppableId={droppableId} 
                // type='A'
            >
                {(provided) => (
                    <ul 
                        className='task-list' 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                    >        
                        {
                            tasks.map( (task, i) => {
                                return(
                                    <Draggable 
                                        key={task.task_id}
                                        draggableId={task.task_id.toString()}
                                        index={i}
                                    >
                                        {(provided) => (
                                            <li 
                                                className='task'
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <Task
                                                    taskId={task.task_id}
                                                    taskTitle={task.task_name}
                                                    taskDescription={task.task_description}
                                                    dueDate={task.due_date.slice(0,10)}
                                                    status={task.status}
                                                    handleDelBtn={handleDelBtn}
                                                    handleCompleteBtn={handleCompleteBtn}
                                                    handleNextStatusBtn={handleNextStatusBtn}
                                                    handlePrevStatusBtn={handlePrevStatusBtn}
                                                />
                                            </li>
                                        )}
                                    </Draggable>
                                ); 
                            })         
                        }
                        {provided.placeholder}                
                    </ul>
                )}
            </Droppable>
        </>
    );
}


export default TaskList;