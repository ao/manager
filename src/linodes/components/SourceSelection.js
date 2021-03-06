import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DistroSelection from './DistroSelection';
import { changeSourceTab, selectSource } from '../actions/create';
import { distros as distroAssets } from '~/assets';

export default class SourceSelection extends Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.renderSourceTabs = this.renderSourceTabs.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.sourceSelected = this.sourceSelected.bind(this);
  }

  sourceSelected() {
    const { ui } = this.props;
    return ui.source !== null;
  }

  renderSourceTabs({ dispatch, distros, ui }) {
    if (this.sourceSelected()) return null;
    return (<div>
      <Tabs
        onSelect={ix => dispatch(changeSourceTab(ix))}
        selectedIndex={ui.sourceTab}
      >
        <TabList>
          <Tab>Distributions</Tab>
          <Tab>StackScripts</Tab>
          <Tab>Backups</Tab>
        </TabList>
        <TabPanel>
          <DistroSelection
            onSelection={d => dispatch(selectSource(d))}
            selected={ui.source}
            distros={distros}
          />
        </TabPanel>
        <TabPanel>
          StackScript Selection
        </TabPanel>
        <TabPanel>
          Backups Selection
        </TabPanel>
      </Tabs>
    </div>);
  }

  renderHeader() {
    const { ui, distros } = this.props;
    if (ui.sourceTab === 0 && this.sourceSelected()) {
      const distro = distros[ui.source];
      return (<h2 className="text-right">
        {distro.label}
        <img
          className="header-icon" src={distroAssets[distro.vendor]
            ? distroAssets[distro.vendor] : '//placehold.it/50x50'}
          width="24" height="24" alt={distro.vendor}
        />
      </h2>);
    }
    return <h2>Select a Source</h2>;
  }

  render() {
    return (
      <div
        className={`card creation-step ${
          this.sourceSelected() ? 'step-done' : ''}`}
      >
        {this.renderHeader()}
        {this.renderSourceTabs(this.props)}
      </div>
    );
  }
}

SourceSelection.propTypes = {
  ui: PropTypes.object.isRequired,
  distros: PropTypes.object.isRequired,
};
