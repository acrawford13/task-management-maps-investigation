import styled from 'styled-components';

export const SidebarHeading = styled.h2`
  color: ${props => props.theme.palette.text};
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.003rem;
  margin-bottom: 1rem;
`;

export const SidebarSubheading = styled.h3`
  color: ${props => props.theme.palette.text};
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.003rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export const Bold = styled.span`
  color: ${props => props.theme.palette.text};
  font-weight: 500;
  letter-spacing: -0.003rem;
`;
