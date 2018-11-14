import React, { Component } from 'react';
import styled from 'styled-components';

const StyledBar = styled.div`
  border-radius: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  background-color: ${props => props.theme.colors.tundora};
`;

const CloseButton = styled.span`
  opacity: 0.5;
  font-size: 1.8rem;
  line-height: 0;
  cursor: pointer;
`;

class StatusBar extends Component {
  render() {
    return (
      <StyledBar className={this.props.className}>
        <span>{this.props.children}</span>
        <CloseButton onClick={this.props.onClick}>&times;</CloseButton>
      </StyledBar>
    );
  }
};

export default StatusBar;
