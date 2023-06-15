import Plyr from 'plyr-react';
import React, { Component } from 'react';
import Hls from 'hls.js';
import "plyr-react/plyr.css"

const videoOptions = {
  seekTime: 5,
  speed: {
    selected: 1,
    options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.5, 4]
  },
  width:"300px",
  height:"auto"
};

export default class PlyrPlayer extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.src = props.src;
    this.hls = null;
  }

  componentDidMount() {
    this.loadVideo();
  }

  componentWillUnmount() {
    if (this.hls) {
      this.hls.destroy();
    }
  }

  loadVideo = async () => {
    const video = document.getElementById('plyr');
    this.hls = new Hls();
    this.hls.loadSource(this.src);
    this.hls.attachMedia(video);

    this.ref.current.plyr.media = video;

    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.ref.current.plyr.play();
    });
  };

  render() {
    return (
      <div>
        <Plyr
        id="plyr"
        options={videoOptions}
        source={{}}
        ref={this.ref}
        controls={false}
      />
      </div>
      
    );
  }
}
