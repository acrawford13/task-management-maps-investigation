import React, { Fragment } from 'react';
import tasks from 'tasks.js';
import providers from 'people.js';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SelectedTaskDetail from 'components/molecules/SelectedTaskDetail/SelectedTaskDetail';
import ProviderList from '../components/ProviderList/ProviderList';
import ArrowButton from 'components/molecules/ArrowButton/ArrowButton';
import { setSidebarView, selectTask } from 'ducks/view/view';
import { assignTask, unassignTask } from 'ducks/tasks/tasks';
import { setFocusedTask } from 'ducks/map/map';
import { SidebarHeading, Text } from 'components/atoms/Typography/Typography';
import ProviderDetail from '../components/ProviderDetail/ProviderDetail';

const Wrapper = styled.div`
  padding-top: 1rem;
`;

const TaskAssignment = ({ setSidebarView, setFocusedTask, task, tasks, providers, selectTask, unassignTask }) => {
  const bestProviders =
    task.best_provider && providers.filter(provider => provider.id === task.best_provider.provider_id);
  return (
    <Wrapper>
      {task && <SelectedTaskDetail onClick={() => setFocusedTask(task)} {...task} />}
      <SidebarHeading>Providers</SidebarHeading>
      {bestProviders && <ProviderList title="Suggested" providers={bestProviders} />}
      <ProviderList title="Available" providers={providers} />
      <ArrowButton
        onClick={() => {
          selectTask(null);
          setSidebarView('tasks');
        }}
        type="bold"
        direction="back"
      >
        Show all tasks
      </ArrowButton>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  task: state.tasks.get(state.view.get('selected_task')).toJS(),
  providers: state.providers.toList().toJS(),
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  setSidebarView: path => dispatch(setSidebarView(path)),
  setFocusedTask: task => dispatch(setFocusedTask(task)),
  selectTask: task => dispatch(selectTask(task)),
  assignTask: ({ task, provider }) => dispatch(assignTask({ task, provider })),
  unassignTask: ({ task, provider }) => dispatch(unassignTask({ task, provider })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskAssignment);
