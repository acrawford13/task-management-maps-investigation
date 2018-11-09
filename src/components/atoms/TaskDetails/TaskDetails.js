import React, { Fragment } from 'react';
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

const TaskDetails = ({ start_time, end_time, name, status }) => (
  <div>
    <Text>
      <strong>
        {moment.utc(start_time).format('HH:mm')} - {moment.utc(end_time).format('HH:mm')}
      </strong>
      <br />
      <span>{name}</span>
    </Text>
    <StyledStatusLabel status={status} />
  </div>
);

export default TaskDetails;
