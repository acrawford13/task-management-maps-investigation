import React from 'react';
import styled from 'styled-components';

const PrimaryButton = styled.a`
  display: block;
  border-radius: 0.4rem;
  padding: 0.75rem 1rem;
  background-color: ${props => (props.success ? props.theme.colors.shamrock : props.theme.colors.bittersweet)};
  color: white;
  width: 100%;
  text-align: center;
  margin: 1rem 0;
  cursor: pointer;
  user-select: none;
`;

const BoldButton = styled.a`
  display: block;
  border-radius: 0.4rem;
  padding: 0.75rem 1rem;
  background-color: white;
  color: ${props => props.theme.colors.oxfordBlue};
  width: 100%;
  text-align: center;
  margin: 1rem 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.25rem;
  user-select: none;
`;

const TertiaryButton = styled.a`
  color: ${props => props.theme.colors.oxfordBlue};
  cursor: pointer;
  margin: 1rem 0;
  user-select: none;
`;

const Button = ({ type, ...props }) => {
  switch (type) {
    case 'tertiary':
      return <TertiaryButton {...props} />;
    case 'bold':
      return <BoldButton {...props} />;
    default:
      return <PrimaryButton {...props} />;
  }
};

export default Button;
