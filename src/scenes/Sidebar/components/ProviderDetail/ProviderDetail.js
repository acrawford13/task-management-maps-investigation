import React from 'react';
import styled from 'styled-components';

import SidebarListItem from 'components/atoms/SidebarListItem/SidebarListItem';
import ProviderDetails from 'components/atoms/ProviderDetails/ProviderDetails';
import Button from 'components/atoms/Button/Button';
import { Text } from 'components/atoms/Typography/Typography';
import Calendar from 'components/organisms/Calendar/Calendar';

const Wrapper = styled.div`
  padding-top: 1rem;
`;

const ProviderDetailsWrapper = styled(SidebarListItem)`
  padding-top: 0.5rem;
  grid-template-columns: 25% 1fr;
  padding-right: 1rem;
  cursor: pointer;
  border-bottom: none;
`;

const ProviderDetail = ({ provider, task, tasks, assignTask, unassignTask, selectTask, setSidebarView }) => {
  // const taskIsUnassigned = provider.tasks.indexOf(task.id) === -1;
  const taskEvents = [...provider.tasks.map(id => tasks.get(id).toJS())];
  if (task.status === 'not_assigned') {
    taskEvents.push({ ...task, assigning: true });
  }

  return (
    <Wrapper>
      {task.status === 'assigned' && <Text>Provider assigned:</Text>}
      <ProviderDetailsWrapper>
        <ProviderDetails {...provider} />
      </ProviderDetailsWrapper>
      {task.status === 'not_assigned' ? (
        <Button success onClick={() => assignTask({ task, provider })}>
          Assign {provider.name.split(' ')[0]}
        </Button>
      ) : (
        <Button warning onClick={() => unassignTask({ task, provider })}>
          Unassign {provider.name.split(' ')[0]}
        </Button>
      )}
      <Calendar
        events={taskEvents}
        availability={provider.availability}
        unavailability={provider.unavailability}
        start_time="2018-11-12T07:00:00Z"
        end_time="2018-11-13T00:00:00Z"
        handleEventClick={selectTask}
        timeIntervals={5}
      />
    </Wrapper>
  );
};

export default ProviderDetail;
