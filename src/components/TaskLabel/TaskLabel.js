import React from 'react';

const onClick = e => {
  console.log(e);
}

const TaskLabel = ({ name, type }) => <div className="task-label" onClick={onClick}>{name}</div>

export default TaskLabel;