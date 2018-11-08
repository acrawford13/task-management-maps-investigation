import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

const StyledLink = styled.a`
  color: #2ccadd;
`

const Wrapper = styled.div`
  max-width: 20rem;
`

const InfoWindowContent = ({ task }) => {
  return (
    <Wrapper>
      <h2>{task.label}</h2>
      <strong>{moment(task.start_time).format('LT')} - {moment(task.end_time).format('LT')}</strong><br/>
      <span>{moment(task.start_time).format('LL')}</span>
      <div>
        <br/>
        {task.closest_providers ? (
          <>
          <h4>Best providers:</h4>
          {task.closest_providers.map(provider => <><span>{provider.name}</span>&emsp;<StyledLink>Details</StyledLink> | <StyledLink>Assign</StyledLink><br/></>)}
        </>)
        : <StyledLink href="http://www.google.com">Find best provider for this task</StyledLink>}
      </div>
      {/* <select>
        <option>test</option>
        <option>test</option>
        <option>test</option>
        <option>test</option>
      </select> */}
    </Wrapper>
  );
}
 
export default InfoWindowContent;