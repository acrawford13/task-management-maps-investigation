import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

import Marker from 'components/atoms/Marker/Marker';
import StatusLabel from 'components/atoms/StatusLabel/StatusLabel';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: min-content 1fr;
  grid-template-areas: 'marker text' 'marker label';
`;

const PositionedMarker = styled(Marker)`
  grid-area: marker;
  padding-right: 0.75rem;
`;

const PositionedLabel = styled(StatusLabel)`
  grid-area: label;
  justify-self: flex-start;
  align-self: flex-end;
  margin-top: 0.25rem;
`;

const Text = styled.div`
  color: ${props => props.theme.colors.quartz};
  letter-spacing: -0.005rem;
`;

const TaskDetail = ({ start_time, end_time, name }) => {
  const start = moment(start_time).format('HH:mm');
  const end = moment(end_time).format('HH:mm')
  return (
    <Wrapper>
      <PositionedMarker time={start} />
      <Text>
        <strong>{start} - {end}</strong><br/>
        <span>{name}</span>
      </Text>
      <PositionedLabel>Not assigned</PositionedLabel>
    </Wrapper>
  );
}
 
export default TaskDetail;