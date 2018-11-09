import styled from 'styled-components';

const SidebarListItem = styled.div`
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-template-rows: 1fr;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.translucentOxfordBlue};
`;

export default SidebarListItem;
