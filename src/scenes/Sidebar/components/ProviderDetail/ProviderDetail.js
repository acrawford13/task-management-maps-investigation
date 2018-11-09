import React from 'react';
import styled from 'styled-components';

import SidebarListItem from 'components/atoms/SidebarListItem/SidebarListItem';
import ProviderDetails from 'components/atoms/ProviderDetails/ProviderDetails';
import Button from 'components/atoms/Button/Button';

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

const ProviderDetail = ({ provider, task, assignTask, unassignTask }) => {
  return (
    <Wrapper>
      <ProviderDetailsWrapper>
        <ProviderDetails {...provider} />
      </ProviderDetailsWrapper>
      {provider.tasks.indexOf(task.id) > -1 ? (
        <Button warning onClick={() => unassignTask({ task, provider })}>
          Unassign {provider.name.split(' ')[0]}
        </Button>
      ) : (
        <Button success onClick={() => assignTask({ task, provider })}>
          Assign {provider.name.split(' ')[0]}
        </Button>
      )}
    </Wrapper>
  );
};

export default ProviderDetail;
