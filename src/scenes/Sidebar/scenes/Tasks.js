import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import TaskList from '../components/TaskList/TaskList';
import ArrowButton from 'components/molecules/ArrowButton/ArrowButton';
import { setSidebarView, selectTask } from 'ducks/view/view';
import { setFocusedTask } from 'ducks/map/map';

const Tasks = ({ setSidebarView, selectTask, setFocusedTask, tasks }) => {
  return (
    <Fragment>
      {/* <ArrowButton onClick={() => setSidebarView('providers')} type="tertiary" direction="back">
        Back to providers
      </ArrowButton> */}
      <TaskList
        onSelectTask={task => {
          selectTask(task.id);
          setFocusedTask(task);
          setSidebarView(task.status === 'assigned' ? 'provider_detail' : 'task_assignment');
        }}
        tasks={tasks}
      />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebar_view: state.view.get('sidebar_view'),
  tasks: state.tasks.toList().toJS(),
});

const mapDispatchToProps = dispatch => ({
  setSidebarView: path => dispatch(setSidebarView(path)),
  selectTask: taskID => dispatch(selectTask(taskID)),
  setFocusedTask: task => dispatch(setFocusedTask(task)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
