import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment-timezone';

import { getDataset } from 'utils/datasets';
import SelectedTaskDetail from 'components/molecules/SelectedTaskDetail/SelectedTaskDetail';
import ArrowButton from 'components/molecules/ArrowButton/ArrowButton';
import { setSidebarView, selectTask, selectProvider, addNotification, clearNotifications } from 'ducks/view/view';
import { assignTask, unassignTask } from 'ducks/tasks/tasks';
import { setFocusedTask, addPaths, clearPaths } from 'ducks/map/map';
import ProviderDetail from '../components/ProviderDetail/ProviderDetail';

import { createUnavailability, countOverlappingTasks, timeSort } from 'utils/calendar';
import travelData from 'travelData.js';

const Wrapper = styled.div`
  padding-top: 1rem;
`;

const dataset = getDataset();

class ProviderPanel extends Component {

  createPathType = (prevId, nextId, selectedTaskId) => {
    if(prevId === selectedTaskId) {
      return "after";
    } else if (nextId === selectedTaskId) {
      return "before";
    }
  }

  getPaths = ({ task, provider }) => {
    // get paths to show on map (all of current provider's tasks, OR all of proposed provider's tasks).
    // if (!task || !provider) return [];
    // const providerTasks = provider.tasks;
    // if (providerTasks.length === 0) return [];
    const displayTasks = provider.tasks.map(taskID => this.props.tasks.get(taskID).toJS());
    if (task.status === 'not_assigned') {
      displayTasks.push(task);
    }
    displayTasks.sort(timeSort);
    const paths =  displayTasks.reduce(
      (paths, point, index) => {
        if(index !== 0) {
          const from = displayTasks[index - 1]
          const to = displayTasks[index];
          const route = travelData[dataset.name][from.id][to.id];
          paths.push({
            route,
            from,
            to,
            type: this.createPathType(from.id, to.id, task.id),
            warning: !moment.utc(to.start_time).isAfter(moment.utc(from.end_time).add(route.duration.value, 'seconds'))
          });
        };
        return paths;
      }, []);
    return paths;
  }

  componentDidMount() {
    this.props.clearPaths();
    this.props.addPaths(this.getPaths({ task: this.props.task, provider: this.props.provider }));

    const providerUnavailabilility = createUnavailability({
      availability: this.props.provider.availability,
      start_time: dataset.start_time,
      end_time: dataset.end_time,
    });
    const providerIsUnavailable = countOverlappingTasks(this.props.task, providerUnavailabilility);
    const numberOfOverlaps = countOverlappingTasks(this.props.task, this.props.providerTasks);
    if (this.props.task.status === 'assigned') return;
    if (numberOfOverlaps) {
      const taskPlural = numberOfOverlaps > 1 ? 'tasks' : 'task';
      this.props.addNotification(`Provider is busy with ${numberOfOverlaps} other ${taskPlural} at the same time`);
    } else if (providerIsUnavailable) {
      this.props.addNotification(`Provider is not available at this time.`);
    }
  }

  componentWillUnmount() {
    this.props.clearNotifications();
    this.props.selectProvider(null);
    this.props.clearPaths();
  }

  componentDidUpdate(prevProps) {
    if(this.props.provider.id !== prevProps.provider.id || this.props.task.id !== prevProps.task.id) {
      this.props.clearPaths();
      this.props.clearNotifications();
      this.props.addPaths(this.getPaths({ task: this.props.task, provider: this.props.provider }));
    }
  }

  render() {
    return (
      <Wrapper>
        {this.props.task && (
          <SelectedTaskDetail onClick={() => this.props.setFocusedTask(this.props.task)} {...this.props.task} />
        )}
        {this.props.task.status === 'assigned' ? (
          <ArrowButton onClick={() => this.props.setSidebarView('tasks')} type="tertiary" direction="back">
            Back to tasks
          </ArrowButton>
        ) : (
          <ArrowButton onClick={() => this.props.setSidebarView('task_assignment')} type="tertiary" direction="back">
            Back to providers
          </ArrowButton>
        )}
        <ProviderDetail
          task={this.props.task}
          tasks={this.props.tasks}
          provider={this.props.provider}
          assignTask={this.props.assignTask}
          unassignTask={this.props.unassignTask}
          setSidebarView={this.props.setSidebarView}
          selectTask={this.props.selectTask}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  const task = state.tasks.get(state.view.get('selected_task'));
  const viewingProvider = state.providers.get(state.view.get('selected_provider'));
  const assignedProvider = state.providers.get(task.get('assigned_provider'));
  const providerTasks =
    (viewingProvider || assignedProvider) &&
    (viewingProvider || assignedProvider).get('tasks').map(id => state.tasks.get(id));

  return {
    sidebar_view: state.view.get('sidebar_view'),
    task: task.toJS(),
    provider: (viewingProvider || assignedProvider).toJS(),
    tasks: state.tasks,
    providerTasks: providerTasks.toJS(),
  };
};

const mapDispatchToProps = dispatch => ({
  setSidebarView: path => dispatch(setSidebarView(path)),
  selectTask: task => dispatch(selectTask(task)),
  selectProvider: provider => dispatch(selectProvider(provider)),
  assignTask: ({ task, provider }) => dispatch(assignTask({ task, provider })),
  unassignTask: ({ task, provider }) => dispatch(unassignTask({ task, provider })),
  setFocusedTask: task => dispatch(setFocusedTask(task)),
  addNotification: message => dispatch(addNotification(message)),
  clearNotifications: () => dispatch(clearNotifications()),
  addPaths: paths => dispatch(addPaths(paths)),
  clearPaths: () => dispatch(clearPaths()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProviderPanel);
