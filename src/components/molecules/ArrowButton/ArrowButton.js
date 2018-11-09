import React from 'react';
import styled from 'styled-components';

import Button from 'components/atoms/Button/Button';
import Arrow from 'components/atoms/Arrow/Arrow';

const StyledButton = styled(Button)`
  display: grid;
  grid-template-columns: ${props => (props.direction === 'back' ? 'min-content 1fr' : '1fr min-content')};
  grid-template-areas: ${props => (props.direction === 'back' ? "'arrow .'" : "'. arrow'")};
`;

const StyledArrow = styled(Arrow)`
  height: 0.8rem;
  transform: ${props => (props.direction === 'back' ? 'rotate(180deg)' : '')};
  grid-area: arrow;
  align-self: center;
  opacity: 0.5;
  margin-left: ${props => (props.direction === 'back' ? '' : '0.5rem')};
  margin-right: ${props => (props.direction === 'back' ? '0.5rem' : '')};
`;

const ButtonText = styled.span`
  grid-row: 1;
`;

const ArrowButton = ({ type, direction, children, ...props }) => {
  return (
    <StyledButton {...props} type={type} direction={direction}>
      <StyledArrow direction={direction} />
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
};

export default ArrowButton;
