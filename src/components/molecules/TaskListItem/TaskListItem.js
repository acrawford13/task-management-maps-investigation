import React from 'react';
import styled from 'styled-components';

import TaskDetails from 'components/atoms/TaskDetails/TaskDetails';
import SidebarListItem from 'components/atoms/SidebarListItem/SidebarListItem';
import moment from 'moment-timezone';

const Wrapper = styled(SidebarListItem)`
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-template-rows: 1fr;
  padding-bottom: 1rem;
  cursor: pointer;
  user-select: none;
`;

const BigTime = styled.span`
  color: ${props => props.theme.palette.text};
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
`;

const TaskListItem = ({ name, start_time, end_time, status, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <Wrapper onClick={onClick}>
      <BigTime>
        {moment.utc(start_time).format('HH:mm')}
        {/* <i onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} className="far fa-eye" /> */}
      </BigTime>

      <TaskDetails name={name} start_time={start_time} end_time={end_time} status={status} />
    </Wrapper>
  );
};

export default TaskListItem;
