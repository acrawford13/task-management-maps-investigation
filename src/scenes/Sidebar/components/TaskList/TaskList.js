import React, { Fragment } from 'react';

import { SidebarHeading } from 'components/atoms/Typography/Typography';
import TaskListItem from 'components/molecules/TaskListItem/TaskListItem';

const TaskList = ({ tasks, openTask, onSelectTask }) => {
  return (
    <Fragment>
      <SidebarHeading>Tasks</SidebarHeading>
      {tasks.map(task => (
        <TaskListItem onClick={() => onSelectTask(task)} key={task.id} {...task} />
      ))}
    </Fragment>
  );
};

export default TaskList;
