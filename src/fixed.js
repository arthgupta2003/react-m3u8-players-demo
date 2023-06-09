import React, { useEffect, useState } from 'react';
import flvjs from 'flv.js';
import hlsjs from 'hls.js';
import 'mediaelement';

// Import stylesheet and shims
import 'mediaelement/build/mediaelementplayer.min.css';
import 'mediaelement/build/mediaelement-flash-video.swf';

const MediaElement = (props) => {
  const [player, setPlayer] = useState(null);

  const success = (media, node, instance) => {
    // Your action when media was successfully loaded
  };

  const error = (media) => {
    // Your action when media had an error loading
  };

  useEffect(() => {
    const { MediaElementPlayer } = global;

    if (!MediaElementPlayer) {
      return;
    }

    const options = Object.assign({}, JSON.parse(props.options), {
      // Read the Notes below for more explanation about how to set up the path for shims
      pluginPath: './static/media/',
      success: (media, node, instance) => success(media, node, instance),
      error: (media, node) => error(media, node)
    });

    window.flvjs = flvjs;
    window.Hls = hlsjs;

    const newPlayer = new MediaElementPlayer(props.id, options);
    setPlayer(newPlayer);

    return () => {
      newPlayer.remove();
      setPlayer(null);
    };
  }, [props.id, props.options]);

  const sources = JSON.parse(props.sources);
  const tracks = JSON.parse(props.tracks);

  const sourceTags = sources.map((source) => (
    <source key={source.src} src={source.src} type={source.type} />
  ));

  const tracksTags = tracks.map((track) => (
    <track
      key={track.src}
      src={track.src}
      kind={track.kind}
      srclang={track.lang}
      label={track.label ? track.label : undefined}
    />
  ));

  const mediaBody = (
    <>
      {sourceTags}
      {tracksTags}
    </>
  );

  const mediaHtml =
    props.mediaType === 'video' ? (
      <video
        id={props.id}
        width={props.width}
        height={props.height}
        poster={props.poster ? props.poster : undefined}
        preload={props.preload ? props.preload : undefined}
        autoPlay={props.autoPlay}
        controls={props.controls}
      >
        {mediaBody}
      </video>
    ) : (
      <audio id={props.id} width={props.width} controls={props.controls}>
        {mediaBody}
      </audio>
    );

  return <div dangerouslySetInnerHTML={{ __html: mediaHtml }} />;
};

export default MediaElement;
