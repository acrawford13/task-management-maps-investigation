import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Tasks from './scenes/Tasks';
import Providers from './scenes/Providers';
import ProviderDetail from './scenes/ProviderDetail';
import TaskAssignment from './scenes/TaskAssignment';
import { setSidebarView } from '../../ducks/view/view';

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.alto};
  overflow-y: auto;
  padding: 1rem;
  grid-row: 1;
  grid-column: 2;
`;

const SidebarRouter = ({ view }) => {
  switch (view) {
    case 'tasks':
      return <Tasks />;
    case 'task_assignment':
      return <TaskAssignment />;
    case 'providers':
      return <Providers />;
    case 'provider_detail':
      return <ProviderDetail />;
    default:
      return;
  }
};

const Sidebar = props => (
  <Wrapper>
    <SidebarRouter view={props.view.sidebar_view} />
  </Wrapper>
);

const mapStateToProps = state => ({
  view: state.view.toJS(),
});

const mapDispatchToProps = dispatch => ({
  setSidebarView: () => dispatch(setSidebarView('providers')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
