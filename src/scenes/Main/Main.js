import React from 'react';
import styled from 'styled-components';

import Map from 'components/organisms/Map/Map';
import Sidebar from 'scenes/Sidebar/Sidebar';

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  height: 100vh;
  width: 100vw;
`

const Main = () => (
  <MainGrid>
    <Map />
    <Sidebar/>
  </MainGrid>
);
 
export default Main;