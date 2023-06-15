import React from 'react';
import shaka from 'shaka-player';
import Hls from 'hls.js';

class SimpleShaka extends React.PureComponent {
  constructor(props) {
    super(props);
    this.videoComponent = React.createRef();
    this.onErrorEvent = this.onErrorEvent.bind(this);
    this.onError = this.onError.bind(this);
    this.src = props.src;
  }

  onErrorEvent(event) {
    this.onError(event.detail);
  }

  onError(error) {
    console.error('Error code', error.code, 'object', error);
  }

  componentDidMount() {
    const manifestUri = this.src;
    const video = this.videoComponent.current;
    const player = new shaka.Player(video);

    // Check if HLS is supported by the browser
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(manifestUri);
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error', data);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback to native HLS support for Safari
      video.src = manifestUri;
    } else {
      console.error('HLS is not supported');
    }

    player.addEventListener('error', this.onErrorEvent);
    player.load(manifestUri).then(() => {
      console.log('The video has now been loaded!');
    }).catch(this.onError);
  }

  render() {
    return (
      <video
        width="640"
        ref={this.videoComponent}
        poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
        controls
      />
    );
  }
}

export default SimpleShaka;
