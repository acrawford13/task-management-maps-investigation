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
import { countOverlappingTasks, createUnavailability } from 'utils/calendar';
import { sortByName } from 'utils/sorting';

const categoriseProviders = ({ providers, available, notAvailable, tasks, task }) => {
  providers.forEach(provider => {
    const unavailability = createUnavailability({
      availability: provider.availability,
      start_time: '2018-11-12T00:00:00Z',
      end_time: '2018-11-13T00:00:00Z',
    });
    const providerTasks = provider.tasks.map(id => tasks.get(id).toJS());
    const providerIsAvailable = countOverlappingTasks(task, unavailability) === 0;
    const providerHasNoOverlappingTasks = countOverlappingTasks(task, providerTasks) === 0;
    if (providerIsAvailable && providerHasNoOverlappingTasks) {
      available.push(provider);
    } else {
      notAvailable.push(provider);
    }
  });
};

const Wrapper = styled.div`
  padding-top: 1rem;
`;

const TaskAssignment = ({ setSidebarView, setFocusedTask, task, tasks, providers, selectTask, unassignTask }) => {
  const availableProviders = [];
  const unavailableProviders = [];

  categoriseProviders({ providers, tasks, task, available: availableProviders, notAvailable: unavailableProviders });

  const bestProviders = [
    (availableProviders.length ? availableProviders : unavailableProviders)
      .sort((a, b) => a.tasks.length - b.tasks.length)
      .shift(),
  ];

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
          {bestProviders.length > 0 && <ProviderList title="Best match" providers={bestProviders.sort(sortByName)} />}
        </Fragment>
      ) : (
        <Fragment>
          {bestProviders.length > 0 && <ProviderList title="Best match" providers={bestProviders.sort(sortByName)} />}
          <ProviderList title="Available" providers={availableProviders.sort(sortByName)} />
        </Fragment>
      )}
      {unavailableProviders.length > 0 && <ProviderList title="Unavailable" providers={unavailableProviders.sort(sortByName)} />}
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
