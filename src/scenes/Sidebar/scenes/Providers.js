import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import providers from 'people.js';

import ProviderList from '../components/ProviderList/ProviderList';
import ArrowButton from 'components/molecules/ArrowButton/ArrowButton';
import { setSidebarView } from 'ducks/view/view';

const Providers = ({ setSidebarView }) => {
  return (
    <Fragment>
      <ArrowButton onClick={() => setSidebarView('tasks')} type="tertiary" direction="back">
        Back to tasks
      </ArrowButton>
      <ProviderList providers={providers} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebar_view: state.view.get('sidebar_view'),
});

const mapDispatchToProps = dispatch => ({
  setSidebarView: path => dispatch(setSidebarView(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Providers);
