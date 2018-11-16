import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import TaskList from '../components/TaskList/TaskList';
import { setSidebarView, selectTask, selectProvider } from 'ducks/view/view';
import { setFocusedTask } from 'ducks/map/map';

class Tasks extends Component {
  componentDidMount() {
    this.props.selectTask(null);
  }

  render () {
    return (
      <Fragment>
        <TaskList
          onSelectTask={task => {
            this.props.selectTask(task);
            this.props.setFocusedTask(task);
            this.props.setSidebarView(task.status === 'assigned' ? 'provider_detail' : 'task_assignment');
          }}
          onMouseEnterTask={task => {
            this.props.setFocusedTask(task);
          }}
          onMouseLeaveTask={() => {
            this.props.setFocusedTask(null);
          }}
          tasks={this.props.tasks}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  sidebar_view: state.view.get('sidebar_view'),
  tasks: state.tasks.toList().toJS(),
});

const mapDispatchToProps = dispatch => ({
  setSidebarView: path => dispatch(setSidebarView(path)),
  selectTask: task => dispatch(selectTask(task)),
  setFocusedTask: task => dispatch(setFocusedTask(task)),
  selectProvider: task => dispatch(selectProvider(task)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
