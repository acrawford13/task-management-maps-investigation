import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

import Marker from 'components/atoms/Marker/Marker';
import TaskDetails from '../../atoms/TaskDetails/TaskDetails';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 25% 1fr;
  grid-template-areas: 'marker text' 'marker label';
  margin-bottom: 2rem;
  cursor: pointer;
`;

const PositionedMarker = styled(Marker)`
  grid-area: marker;
  padding-right: 0.75rem;
`;

// const PositionedLabel = styled(StatusLabel)`
//   grid-area: label;
//   justify-self: flex-start;
//   align-self: flex-end;
//   margin-top: 0.25rem;
// `;

const SelectedTaskDetail = ({ start_time, end_time, name, status, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <PositionedMarker time={start_time} status={status} />
      <TaskDetails name={name} start_time={start_time} end_time={end_time} status={status} />
    </Wrapper>
  );
}

export default SelectedTaskDetail;