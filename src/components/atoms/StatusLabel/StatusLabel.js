import styled from 'styled-components';

const StatusLabel = styled.span`
  background-color: ${props => props.color};
  color: white;
  border-radius: 0.25rem;
  padding: 0.2rem 0.4rem;
  font-size: 0.8rem;
`;

StatusLabel.defaultProps = {
  color: '#ff7277'
};

export default StatusLabel;