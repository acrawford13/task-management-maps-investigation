import React from 'react';
import styled from 'styled-components';

const WarningText = styled.span`
  color: ${props => props.theme.palette.text};
  color: white;
  margin-left: 0.5rem;
  font-weight: 500;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.flamePea};
  /* border: 1px dashed ${props => props.theme.colors.tundora}; */
  padding: 0.5rem 0.75rem;
  border-radius: 0.4rem;
  color: white;
`

const Warning = ({ children }) => (
  <Wrapper>
    <i className="icon-user-unfollow" />
    <WarningText>{children}</WarningText>
  </Wrapper>
);

export default Warning;