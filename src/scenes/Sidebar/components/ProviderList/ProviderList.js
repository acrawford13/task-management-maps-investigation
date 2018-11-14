import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ProviderListItem from 'components/molecules/ProviderListItem/ProviderListItem';
import { SidebarSubheading } from 'components/atoms/Typography/Typography';
import { setSidebarView, selectProvider } from 'ducks/view/view';

const ProviderList = ({ providers, title, setSidebarView, selectProvider }) => {
  return (
    <Fragment>
      <SidebarSubheading>{title}</SidebarSubheading>
      {providers.map(provider => (
        <ProviderListItem
          key={provider.id}
          onClick={() => {
            selectProvider(provider.id);
            setSidebarView('provider_detail');
          }}
          {...provider}
        />
      ))}
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  setSidebarView: path => dispatch(setSidebarView(path)),
  selectProvider: providerID => dispatch(selectProvider(providerID)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ProviderList);
