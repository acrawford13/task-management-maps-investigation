import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  display: inline-block;
  background-color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.4rem;
  color: '#3a4556';
  font-weight: 500;
  z-index: 999;
  position: relative;
  background-color: ${props => (props.warning ? '#FF5252' : '#2cc5d7')};
  color: white;
  font-size: 0.9rem;
  margin: 0.25rem;
`;

const WarningIcon = styled.span`
  margin-right: 0.5rem;
  font-weight: bold;
`;

const DurationMarker = ({ children, warning }) => {
  return (
    <Wrapper warning={warning}>
      {warning && <WarningIcon className="icon-exclamation" />}
      {children}
    </Wrapper>
  );
};

export default DurationMarker;
