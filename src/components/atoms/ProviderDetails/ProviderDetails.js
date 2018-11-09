import React, { Fragment } from 'react';
import styled from 'styled-components';
import Avatar from 'components/atoms/Avatar/Avatar';
import { Bold } from 'components/atoms/Typography/Typography';

const TaskDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.oxfordBlue};
  margin-top: 0.25rem;
  font-size: 0.9rem;
  max-width: 10rem;
`;

const StyledAvatar = styled(Avatar)`
  justify-self: center;
  margin-right: 0.75rem;
`;

const Name = styled(Bold)`
  font-size: 1.1rem;
`;

const ProviderDetails = ({ tasks, name }) => {
  return (
    <Fragment>
      <StyledAvatar name={name} />
      <div>
        <Name>{name}</Name>
        <TaskDetailsWrapper>
          <span>Tasks</span>
          <span>{tasks.length}</span>
        </TaskDetailsWrapper>
      </div>
    </Fragment>
  );
};

export default ProviderDetails;
