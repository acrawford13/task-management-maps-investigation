import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

import StatusLabel from 'components/atoms/StatusLabel/StatusLabel';

const Text = styled.div`
  color: ${props => props.theme.palette.text};
  letter-spacing: -0.005rem;
`;

const StyledStatusLabel = styled(StatusLabel)`
  margin-top: 0.25rem;
`;

const Details = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  padding-right: 1rem;
`;

const MapPreviewIcon = styled.i`
  color: grey;
  margin-bottom: 2px;
  font-size: 1.25rem;
`

const TaskDetails = ({ start_time, end_time, name, status, onMouseEnter, onMouseLeave }) => (
  <div>
    <Text>
      <strong>
        {moment.utc(start_time).format('HH:mm')} - {moment.utc(end_time).format('HH:mm')}
      </strong>
      <br />
      <span>{name}</span>
    </Text>
    <Details>
      <StyledStatusLabel status={status} />
      {onMouseEnter && <MapPreviewIcon onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} className="fas fa-map-marker-alt" />}
    </Details>
  </div>
);

export default TaskDetails;
