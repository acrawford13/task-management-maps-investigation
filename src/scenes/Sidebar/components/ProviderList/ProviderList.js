import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ProviderListItem from 'components/molecules/ProviderListItem/ProviderListItem';
import { SidebarSubheading } from 'components/atoms/Typography/Typography';
import { setSidebarView, viewProviderDetails } from 'ducks/view/view';

const ProviderList = ({ providers, title, setSidebarView, viewProviderDetails }) => {
  return (
    <Fragment>
      <SidebarSubheading>{title}</SidebarSubheading>
      {providers.map(provider => (
        <ProviderListItem
          key={provider.id}
          onClick={() => {
            viewProviderDetails(provider.id);
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
  viewProviderDetails: providerID => dispatch(viewProviderDetails(providerID)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ProviderList);
