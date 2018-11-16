import React, { Fragment } from 'react';

import { SidebarHeading, SidebarSubheading } from 'components/atoms/Typography/Typography';
import TaskListItem from 'components/molecules/TaskListItem/TaskListItem';
import { List } from 'immutable';

import statusData from 'utils/statusData';

const TaskList = ({ tasks, openTask, onSelectTask, onMouseEnterTask, onMouseLeaveTask }) => {
  const groupedTasks = List(tasks)
    .groupBy(task => task.status)
    .sort((a, b) => statusData[a.first().status].taskListOrder - statusData[b.first().status].taskListOrder)
    .toJS();
  return (
    <Fragment>
      <SidebarHeading>Tasks</SidebarHeading>
      {Object.keys(groupedTasks).map(category => (
        <Fragment key={category}>
          <SidebarSubheading>{statusData[category].label}</SidebarSubheading>
          {groupedTasks[category].map(task => (
            <TaskListItem onMouseEnter={() => onMouseEnterTask(task)}  onMouseLeave={() => onMouseLeaveTask(task)} onClick={() => onSelectTask(task)} key={task.id} {...task} />
          ))}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default TaskList;
