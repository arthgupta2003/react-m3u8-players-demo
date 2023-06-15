import Plyr from 'plyr-react';
import React, { Component } from 'react';
import Hls from 'hls.js';

export default class PlyrPlayer extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.loadVideo();
  }

  loadVideo = async () => {
    const video = document.getElementById('plyr');
    const hls = new Hls();
    hls.loadSource('https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8');
    hls.attachMedia(video);

    this.ref.current.plyr.media = video;

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.ref.current.plyr.play();
    });
  };

  render() {
    return (
      <Plyr
        id="plyr"
        options={{ volume: 0.1 }}
        source={{}}
        ref={this.ref}
      />
    );
  }
}
