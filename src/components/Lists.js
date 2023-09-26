import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {v4 as uuidV4} from "uuid"

export default function Lists({setActive, lists, setLists}) {

    const listStyle = {
        width: "20%",
    };

    const [value, setValue] = useState("")

    const setActiveList = async(key) => {
        const updatedLists = await lists.map(list => ({
            ...list,
            active: list.key === key
        }));
        setLists(updatedLists);
        setActive(lists.find(list => list.key === key));
    }

    const createList = () => {
        if(value === "") return
        setLists(prevLists => {
            return [...prevLists, {
                name: value,
                key: uuidV4(),
                active: false,
                tasks: []
            }]
        })

        setValue("")
    }

    const handleDelete = (key) => {
        setLists(prevLists => prevLists.filter(list => list.key !== key))
        setActive({name: "", key: "", active: true, tasks: []})
    }

    return (
        <div className='mt-5' style={listStyle}>
            <h2 className='mb-3'>Lists</h2>
            <ListGroup>
                {lists.map(list => {
                    return (<div className='d-flex align-items-center'><ListGroup.Item key={list.key} active={list.active} action onClick={() => setActiveList(list.key)} className='py-2'>
                                {list.name} 
                            </ListGroup.Item>
                            <Button key={uuidV4()} onClick={() => handleDelete(list.key)} className='ms-2 fw-bold' variant='danger'>X</Button>
                            </div>)  
                })}
            </ListGroup>
        
            <div className='input-group mt-2'>
                <input type='text' className='form-control' placeholder='Create new list' value={value} onChange={(e) => setValue(e.target.value)}/>
                <Button variant='primary' onClick={createList}>+</Button>
            </div>
        </div>
    )
}
