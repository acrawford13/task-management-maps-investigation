import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SidebarListItem from 'components/atoms/SidebarListItem/SidebarListItem';
import SelectedTaskDetail from 'components/molecules/SelectedTaskDetail/SelectedTaskDetail';
import ArrowButton from 'components/molecules/ArrowButton/ArrowButton';
import { setSidebarView } from 'ducks/view/view';
import { assignTask, unassignTask } from 'ducks/tasks/tasks';
import { setFocusedTask } from 'ducks/map/map';
import ProviderDetail from '../components/ProviderDetail/ProviderDetail';

const Wrapper = styled.div`
  padding-top: 1rem;
`;

const ProviderPanel = ({ setFocusedTask, setSidebarView, provider, task, tasks, assignTask, unassignTask }) => {
  return (
    <Wrapper>
      {task && <SelectedTaskDetail onClick={() => setFocusedTask(task)} {...task} />}
      {task.status === 'assigned' ? (
        <ArrowButton onClick={() => setSidebarView('tasks')} type="tertiary" direction="back">
          Back to tasks
        </ArrowButton>
      ) : (
        <ArrowButton onClick={() => setSidebarView('task_assignment')} type="tertiary" direction="back">
          Back to providers
        </ArrowButton>
      )}
      <ProviderDetail
        task={task}
        tasks={tasks}
        provider={provider}
        assignTask={assignTask}
        unassignTask={unassignTask}
        setSidebarView={setSidebarView}
      />
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  sidebar_view: state.view.get('sidebar_view'),
  provider: state.providers.get(state.view.get('viewing_provider')).toJS(),
  task: state.tasks.get(state.view.get('selected_task')).toJS(),
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  setSidebarView: path => dispatch(setSidebarView(path)),
  assignTask: ({ task, provider }) => dispatch(assignTask({ task, provider })),
  unassignTask: ({ task, provider }) => dispatch(unassignTask({ task, provider })),
  setFocusedTask: task => dispatch(setFocusedTask(task)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProviderPanel);
