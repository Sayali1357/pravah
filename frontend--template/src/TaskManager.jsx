import React, { useState ,useEffect } from 'react'
import {FaPlus, FaCheck, FaPencilAlt, FaSearch, FaTrash} from 'react-icons/fa';
import{ToastContainer}from 'react-toastify';
import {notify } from './utils';
import { CreateTask, GetAllTasks, DeleteTaskById, UpdateTaskById}  from './api.jsx';



function TaskManager(){

    const[input,setInput]=useState(' ');
    const[tasks,setTasks]=useState([]);
    const[copyTasks, setCopyTasks]= useState([]);
    const[updateTasks,setupdateTask] = useState(null);

    const handleTask=() => {
        if(updateTasks && input){
           //create api call
           console.log('update api call');
           const obj = {
            taskName: input,
            isDone: updateTasks.isdone,
            _id:updateTasks._id
           }
           handleUpdateTask(obj);
        }else if (updateTasks === null && input) {
            console.log('create api call');
            //update  api call

            handleAddTask();
        }
        setInput(' ')
    }
    useEffect(() => {
        if(updateTasks){
            setInput(updateTasks.taskName);
        }
    }, [updateTasks])
        

    const handleAddTask = async() => {
        const obj={
            taskName : input,
            isDone: false
        }
        try{
            const{success,message } =
                 await CreateTask(obj);
            if(success){
                //show success toast
                notify(message,'success')
            }else{
                //show error toast
                notify(message,'error')
            }
            fetchAllTasks()
        }catch(err){
            console.error(err);
            notify('Failed to create task','error')
        }
       
    }
    const fetchAllTasks = async() => {
        try{
            const{data} =
                 await GetAllTasks();
            setTasks(data);
            setCopyTasks(data);
           
        }catch(err){
            console.error(err);
            notify('Failed to create task','error')
        }
    }
    useEffect(() =>{
        fetchAllTasks()
    }, [])


    const handleDeleteTask = async(id) => {
        try{
            const {success,message} =
                 await DeleteTaskById(id);
                 if(success){
                    //show success toast
                    notify(message,'success')
                }else{
                    //show error toast
                    notify(message,'error')
                } 
                fetchAllTasks()    
        }catch(err){
            console.error(err);
            notify('Failed to delete task','error')
        }
        
    }
    const handleCheckAndUncheck = async(item) => {
        const{_id, isDone,taskName} = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try{
            const {success,message} =
                 await UpdateTaskById(_id, obj);
                 if(success){
                    //show success toast
                    notify(message,'success')
                }else{
                    //show error toast
                    notify(message,'error')
                } 
                fetchAllTasks()    
        }catch(err){
            console.error(err);
            notify('Failed to create task','error')
        }

    }

    const handleUpdateTask  = async(item) => {
        const{_id, isDone,taskName} = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try{
            const {success,message} =
                 await UpdateTaskById(_id, obj);
                 if(success){
                    //show success toast
                    notify(message,'success')
                }else{
                    //show error toast
                    notify(message,'error')
                } 
                fetchAllTasks()    
        }catch(err){
            console.error(err);
            notify('Failed to delete task','error')
        }
    }
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const result = oldTasks.filter((item) => 
            item.taskName.toLowerCase().include(term));
        setTasks(result);

    }

    

    return(
       
            <div className='d-flex flex-column align-items-center
            w-50 m-auto mt-5'>
                <h1 className='mb-4'>Task Manager App</h1>
                {/* Input and Search box */}
                <div className='d-flex justify-content-between
                align-items-center mb-4 w-100'>
                    <div className='input-group flex-grow-1 me-2 cursor-pointer'>
                    
                        <input type='text'
                            value={input}
                            onChange={
                                (e) => setInput(e.target.value)}
                            className='form-control me-1 cursor-default'
                            placeholder='Add a new Task'
                        />
                        <button
                            onClick={handleTask}
                            className='btn btn-success btn-sm me-2'
                        >
                            <FaPlus className='m-2' />
                        </button>
                    </div>
    
                    <div className='input-group flex-grow-1 cursor-default'>
                        <span
                            className='input-group-text'
                        >
                            <FaSearch />
                        </span>
                        <input
                            onClick={handleSearch}
                            className='form-control'
                            type='text'
                            placeholder='Search tasks'
                        />
                    </div>
                </div>
    
                {/* List of items */}
                <div className='d-flex flex-column w-100'>
                    {
                        tasks.map((item) => (
                            <div key={item._id} className='m-2 p-2 border bg-light
                    w-100 rounded-3 d-flex justify-content-between
                    align-items-center'>
                                <span
                                    className={item.isDone ? 'text-decoration-line-through' : ''}
                                >{item.taskName}
                                </span>
    
                                <div className=''>
                                    <button
                                        onClick={() =>handleCheckAndUncheck(item)}
                                        className='btn btn-success
                                btn-sm me-2 cursor: pointer'
                                        type='button'>
                                        <FaCheck />
                                    </button>
                                    <button
                                       onClick={() => setupdateTask(item)}
                                        className='btn btn-primary
                                btn-sm me-2 cursor: pointer'
                                        type='button'>
                                        <FaPencilAlt />
                                    </button>
                                    <button
                                         onClick = {() => handleDeleteTask(item._id)}
                                        className='btn btn-danger
                                            btn-sm me-2cursor: pointer'
                                        type='button'>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
    
                {/* Toastify */}
                <ToastContainer
                    position='top-right'
                    autoClose={3000}
                    hideProgressBar={false}
                />
           
            
        </div>
        );
    }
export default TaskManager
