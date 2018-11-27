import React from 'react';
import styled from 'styled-components';

import SidebarListItem from 'components/atoms/SidebarListItem/SidebarListItem';
import Arrow from 'components/atoms/Arrow/Arrow';
import ProviderDetails from 'components/atoms/ProviderDetails/ProviderDetails';

const Wrapper = styled(SidebarListItem)`
  padding-bottom: 1.5rem;
  padding-top: 0.5rem;
  grid-template-columns: 25% 1fr min-content;
  cursor: pointer;
`;

const ArrowWrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
`;

const StyledArrow = styled(Arrow)`
  height: 1.5rem;
  opacity: 0.4;
`;

const ProviderListItem = ({ name, tasks, initials, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <ProviderDetails tasks={tasks} initials={initials} name={name} />
      <ArrowWrapper>
        <StyledArrow />
      </ArrowWrapper>
    </Wrapper>
  );
};

export default ProviderListItem;
