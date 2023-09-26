import React, {useState} from "react";
import Lists from "./components/Lists";
import Tasks from "./components/Tasks";

function App() {

  const [active, setActive] = useState({name: "", key: "", active: true, tasks: []})

  const [lists, setLists] = useState([]);

  const updateTasks = (updatedTasks, listKey) => {
    const updatedLists = lists.map(list => {
      if (list.key === listKey) {
        return { ...list, tasks: updatedTasks };
      }
      return list
    })
    setLists(updatedLists);
    setActive(updatedLists.find(list => list.key === listKey));
  }

  return (
    <div className="container">
      <h1 className="my-5 text-center">React To Do</h1>
      <div className="d-flex justify-content-around align-items-top">
        <Lists setActive={setActive} lists={lists} setLists={setLists}/>
        {active && (
          <Tasks
            activeList={active}
            updateTasks={(updatedTasks) => updateTasks(updatedTasks, active.key)}
          />
        )}
      </div>
      
    </div>
  );
}

export default App;
