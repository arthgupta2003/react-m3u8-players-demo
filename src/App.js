import React from 'react';
import { useState } from 'react';
import './App.css';

import "video.js/dist/video-js.css";
import { useVideoJS } from "react-hook-videojs";
import ReactHlsPlayer from 'react-hls-player';
import MediaElement from './MediaElement';
import ClapprComponent from './ClapprComponent';


function App () {
  const [urlInput, setUrl] = useState('');
  const [currentPlayer, setPlayer] = useState('hlsJS');
  const { Video, player, ready } = useVideoJS(
    { sources: [{ src: urlInput ,type:'application/x-mpegURL'}] }
  );
  const VideoJSPlayer = Video
  const sources = [{src: urlInput, type: 'application/x-mpegURL'}], config = {}, tracks = {}
  var allPlayerDict = {
    "videoJS": <VideoJSPlayer controls autoPlay height='500' volume='1' muted/>,
    "hlsJS": <ReactHlsPlayer src={urlInput} autoPlay={true} controls={true} width="50%" height="auto" />,
    "mediaElement": <MediaElement
                id="player1"
                mediaType="video"
                autoPlay= {true}
                preload="none"
                width="600"
                height="360"
                poster=""
                sources={JSON.stringify(sources)}
                options={JSON.stringify(config)}
                tracks={JSON.stringify(tracks)}
                controls
            />,
      "clappr": <ClapprComponent source={urlInput}/>
  };
  return (
    <>
    <h1 className='App-header'> Enter URL of m3u8 asset: </h1>
      <label className='App-header'>
        <input size="50" onChange={e => setUrl(e.target.value)} />
        <button onClick={()=>setPlayer("hlsJS")}>hlsJS </button>
        <button onClick={()=>setPlayer("videoJS")} > videoJS</button>
        <button onClick={()=>setPlayer("mediaElement")} > mediaElement</button>
        <button onClick={()=>setPlayer("clappr")} > clappr</button>
      </label>
      <div className='App-header'>
      {allPlayerDict[currentPlayer]}
      <p>Currently using {currentPlayer} player</p>
      </div>
      
    </>
  );
          } 
export default App;



