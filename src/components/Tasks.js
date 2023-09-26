import React, {useState} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import {v4 as uuidV4} from "uuid"

export default function Tasks({activeList, updateTasks}) {

    const listStyle = {
        width: "20%",
    };

    const [value, setValue] = useState("")

    const check = (key) => {
        const updatedTasks = activeList.tasks.map(task => {
            if(task.key === key){
                const toggle = !task.checked
                return {...task, checked: toggle}
            }
            return task
        })

        updateTasks(updatedTasks)
    }

    const createTask = () => {
        if(value === "") return
        const updatedTasks = [...activeList.tasks, {name: value, key: uuidV4(), checked: false}]
        updateTasks(updatedTasks)
        setValue("")
    }

    const deleteCompleted = () => {
        const updatedTasks = activeList.tasks.filter(task => task.checked !== true)
        updateTasks(updatedTasks)
    }

    return (
        <div className='mt-5' style={listStyle}>
            <h2 className='mb-3'>{activeList.name}</h2>
            <ListGroup>
                {activeList.tasks.map(task => {
                    return <ListGroup.Item key={task.key} active={task.checked} action onClick={() => check(task.key)} className='py-2'>{task.name}</ListGroup.Item>
                })}
            </ListGroup>
            {activeList.name !== "" && 
                <div className='input-group mt-2'>
                    <input type='text' className='form-control' placeholder='Create new task' value={value} onChange={(e) => setValue(e.target.value)}/>
                    <Button variant='primary' onClick={createTask}>+</Button>
                </div>
            }
            {activeList.name !== "" && 
                <Button variant='danger' className='mt-3' onClick={deleteCompleted}>Delete Completed</Button>
            }
        </div>
    )
}
