import React, { Fragment } from 'react';

const RouteInfo = ({ legs }) => {
  return (
  <>
    <div>{legs[0].duration.text}</div>
    <ul>
      {legs[0].steps.map(step => <li>{step.instructions} ({step.duration.text})</li>)}
    </ul>
  </>
  )
}

const TravelInfo = ({ provider, task }) => {
  return (
    <Fragment>
      <h3>{provider.name}</h3>
      <div>Has x tasks today</div>
      <div style={{marginTop: '1rem'}}>
        <strong>Current task</strong>
        <div>Cleaning at Watson</div>
        <div>10:30 - 11:00</div>
        <small>{provider.transitInfo.routes[0].legs[0].duration.text} away from {task.label}</small>
      </div>
      <div style={{marginTop: '1rem'}}>
        <strong>Next task</strong>
        <div>Cleaning at Kambah</div>
        <div>12:30 - 13:00</div>
        <small>1 hour and 27 minutes away from {task.label}</small>
      </div>
      <div style={{marginTop: '1rem'}}>
        {provider.transitInfo.routes.map(route => <RouteInfo {...route} />)}
      </div>
    </Fragment>
  );
}
 
export default TravelInfo;