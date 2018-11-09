import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: ${props => props.theme.colors.silver};
  color: ${props => props.theme.colors.tundora};
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const getInitials = fullName => {
  return fullName
    .split(' ')
    .map(name => name[0])
    .join('');
};

const Avatar = ({ name, className }) => <Wrapper className={className}>{getInitials(name)}</Wrapper>;

export default Avatar;
