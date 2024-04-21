import React, {useState} from 'react'
import axios from "axios"

function Create() {
  const [task, setTask] = useState("");
  const handleAdd = () => {
    // Trim the task input to ensure it's not just whitespace
    const trimmedTask = task.trim();
    if (trimmedTask) {
      axios.post('http://localhost:3001/add', { task: trimmedTask })
        .then(result => {
          // Consider using state management or other methods instead of location.reload()
          location.reload();
        })
        .catch(err => {
          // Handle the error scenario, e.g., show an alert or notification
          console.log(err);
          alert('An error occurred while adding the task.');
        });
    } else {
      // Alert the user that the input is empty
      alert('Please enter a task before adding.');
    }
  };

  return (
    <div className='create_form'>
    <input
      type="text"
      placeholder='Enter Task'
      value={task} // Controlled component must have a value attribute
      onChange={(e) => setTask(e.target.value)}
    />
    <button type='button' onClick={handleAdd}>Add</button>
</div>
  )
}

export default Create