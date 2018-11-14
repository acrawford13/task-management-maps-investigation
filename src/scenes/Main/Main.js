import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Map from 'components/organisms/Map/Map';
import StatusBar from 'components/atoms/StatusBar/StatusBar';
import Sidebar from 'scenes/Sidebar/Sidebar';
import SvgFilterDefs from 'components/atoms/SvgFilterDefs/SvgFilterDefs';

import { removeNotification } from 'ducks/view/view';

const StatusContainer = styled.div`
  grid-column: 1;
  grid-row: 1;
  align-self: flex-start;
  z-index: 2;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  height: 100vh;
  width: 100vw;
`;

const StyledStatusBar = styled(StatusBar)`
  margin: 0.5rem;
`;

const Main = ({ notifications, removeNotification }) => (
  <MainGrid>
    <SvgFilterDefs />
    <Map />
    <StatusContainer>
      {notifications.map((message, index) => (
        <StyledStatusBar key={index} onClick={() => removeNotification(index)}>{message}</StyledStatusBar>
      ))}
    </StatusContainer>
    <Sidebar />
  </MainGrid>
);

const mapStateToProps = state => ({
  notifications: state.view.get('notifications').toJS(),
});

const mapDispatchToProps = dispatch => ({
  removeNotification: notificationId => dispatch(removeNotification(notificationId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
