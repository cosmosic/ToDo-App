import React, { useEffect, useState } from 'react'
import Create from './Create';
import axios from "axios"
import { FiDelete } from "react-icons/fi";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])

    // const handleEdit = (id) => {
    //     axios.put('http://localhost:3001/update/' + id)
    //         .then(result => { location.reload() })
    //         .catch(err => console.log(err))

    // }
    
    const handleEdit = (id) => {
        // Find the task that needs to be updated
        const updatedTodos = todos.map(todo => {
            if (todo._id === id) {
                // Toggle the done status
                return { ...todo, done: !todo.done };
            }
            return todo;
        });
    
        // Find the task to send the correct status to the backend
        const taskToUpdate = updatedTodos.find(todo => todo._id === id);
        
        axios.put('http://localhost:3001/update/' + id, { done: taskToUpdate.done })
            .then(result => {
                setTodos(updatedTodos); // Update the state with the new todo list
            })
            .catch(err => console.log(err));
    };
    

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => { location.reload() }) // Delete todo list
            .catch(err => console.log(err))

    }
    const completedTasks = todos.filter(todo => todo.done).length;
    return (
        <div className='home'>
            <h2> What Do You Want To Do Today?</h2>
            <Create />
            {
                todos.length === 0
                    ?
                    <div><h2>No Record</h2></div>
                    :
                    todos.map(todo => (
                        <div key={todo._id} className='task'> 
                          <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done
                              ?
                              <IoIosCheckbox className='icon' />
                              :
                              <MdCheckBoxOutlineBlank className='icon' />
                            }
                            <p className={todo.done ? "line_through" : ""}>
                              {todo.task} 
                            </p>
                          </div>
                          <div>
                            <span>
                              <FiDelete className='icon' onClick={() => handleDelete(todo._id)} />
                            </span>
                          </div>
                        </div>
                      ))
            }
            <div className='task-summary'>
                <span> <b style={{color:'black'}}>{todos.length - completedTasks}</b> tasks left.</span>
                
                {completedTasks > 0 && (
                    <span >
                        Clear {completedTasks} completed {completedTasks > 1 ? 'tasks' : 'task'}
                    </span>
                )}
            </div>
        </div>
    )
}


export default Home