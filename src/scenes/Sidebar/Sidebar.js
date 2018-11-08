import React from 'react';
import styled from 'styled-components';

import TaskDetail from 'components/molecules/TaskDetail/TaskDetail';

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.grey};
  overflow-y: auto;
  padding: 1rem;
  padding-top: 2rem;
`

const Sidebar = () => (
  <Wrapper>
    <TaskDetail name="Greet at Holcroft" end_time="2018-09-09T07:00:00Z" start_time="2018-09-09T06:00:00Z" />
  </Wrapper>);
 
export default Sidebar;