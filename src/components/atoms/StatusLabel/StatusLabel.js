import React from 'react';
import styled from 'styled-components';

import statusData from 'utils/statusData';

const StyledLabel = styled.span`
  background-color: ${props => props.color};
  color: white;
  border-radius: 0.25rem;
  padding: 0.2rem 0.4rem;
  font-size: 0.8rem;
  display: inline-block;
`;

const StatusLabel = ({ status, className }) => (
  <StyledLabel className={className} color={statusData[status].color}>
    {statusData[status].label}
  </StyledLabel>
);

export default StatusLabel;
