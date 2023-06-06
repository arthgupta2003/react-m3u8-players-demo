import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clappr from 'clappr';

class ClapprPlayer extends Component {
  static propTypes = {
    source: PropTypes.string
  };

  componentDidMount() {
    this.change(this.props.source);
  }

  componentWillUnmount() {
    this.destroyPlayer();
  }
  
  destroyPlayer() {
    if (this.player) {
      this.player.destroy();
    }
    this.player = null;
  }

  change(source) {
    if (this.player) {
      this.destroyPlayer();
    }
    this.player = new Clappr.Player({
      parent: this.playerContainer,
      source: source,
      width: '720',
      height: '360',
      hlsjsConfig: {
        enableWorker: true
      }
    });
  }

  render() {
    return (
      <div ref={(ref) => (this.playerContainer = ref)}>
      </div>
    );
  }
}

export default ClapprPlayer;
