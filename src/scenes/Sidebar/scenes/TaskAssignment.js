import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SelectedTaskDetail from 'components/molecules/SelectedTaskDetail/SelectedTaskDetail';
import ProviderList from '../components/ProviderList/ProviderList';
import ArrowButton from 'components/molecules/ArrowButton/ArrowButton';
import Warning from 'components/atoms/Warning/Warning';
import { setSidebarView, selectTask } from 'ducks/view/view';
import { assignTask, unassignTask } from 'ducks/tasks/tasks';
import { setFocusedTask } from 'ducks/map/map';
import { SidebarHeading } from 'components/atoms/Typography/Typography';
import { countOverlappingTasks } from 'utils/calendar';

const Wrapper = styled.div`
  padding-top: 1rem;
`;

const TaskAssignment = ({ setSidebarView, setFocusedTask, task, tasks, providers, selectTask, unassignTask }) => {
  const availableProviders = providers.filter(provider => {
    const providerTasks = provider.tasks.map(id => tasks.get(id).toJS());
    const providerIsAvailable = countOverlappingTasks(task, provider.availability) > 0;
    const providerHasNoOverlappingTasks = countOverlappingTasks(task, providerTasks) === 0;
    return providerIsAvailable && providerHasNoOverlappingTasks;
  });

  const bestProvidersBuffer = [
    ...((availableProviders.length > 0 && availableProviders) || (providers.length > 0 && providers)),
  ];

  const bestProviders = [bestProvidersBuffer.sort((a, b) => a.tasks.length - b.tasks.length)[0]];

  return (
    <Wrapper>
      {task && <SelectedTaskDetail onClick={() => setFocusedTask(task)} {...task} />}
      <ArrowButton onClick={() => setSidebarView('tasks')} type="tertiary" direction="back">
        Back to tasks
      </ArrowButton>
      <SidebarHeading>Providers</SidebarHeading>
      {availableProviders.length === 0 ? (
        <Fragment>
          <Warning>No providers are available</Warning>
          {bestProviders.length > 0 && <ProviderList title="Best match" providers={bestProviders} />}
        </Fragment>
      ) : (
        <Fragment>
          {bestProviders.length > 0 && <ProviderList title="Best match" providers={bestProviders} />}
          <ProviderList title="Available" providers={availableProviders} />
        </Fragment>
      )}
      <ProviderList title="All providers" providers={providers} />
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
