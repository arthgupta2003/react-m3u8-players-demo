import React from 'react';
import { useState } from 'react';
import './App.css';
import { TextField, Button, Menu, MenuItem } from '@material-ui/core';

import "video.js/dist/video-js.css";
import { useVideoJS } from "react-hook-videojs";
import ReactHlsPlayer from 'react-hls-player';
import MediaElement from './MediaElement';
import ClapprComponent from './ClapprComponent';


function App () {
  const [urlInput, setUrl] = useState('');
  const [currentPlayer, setPlayer] = useState('hlsJS');
  const [anchorEl, setAnchorEl] = useState(null);
  const { Video, player, ready } = useVideoJS(
    { sources: [{ src: urlInput ,type:'application/x-mpegURL'}] }
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePlayerSelect = (player) => {
    setPlayer(player);
    handleClose();
  };
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
      "clappr": <ClapprComponent source={urlInput}/>,
  };
  return (
    <>
    <div class="header">
  <h1>react-m3u8-players-demo</h1>
    </div>
    <p align="center">
      <TextField
        variant="filled"
        size= "small"
        onChange={(e) => setUrl(e.target.value)}
        style={{ backgroundColor: 'white', width: '50%',borderRadius: '5px' }}
        label= 'Enter URL of m3u8 asset:'
      />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <Button onClick={handleClick} variant="contained">
        Select Player
      </Button>
    </p>
    

      

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handlePlayerSelect("hlsJS")}>hlsJS</MenuItem>
        <MenuItem onClick={() => handlePlayerSelect("videoJS")}>videoJS</MenuItem>
        <MenuItem onClick={() => handlePlayerSelect("mediaElement")}>mediaElement</MenuItem>
        <MenuItem onClick={() => handlePlayerSelect("clappr")}>clappr</MenuItem>
      </Menu>

      <div align="center">
      {allPlayerDict[currentPlayer]}
      <p>Currently using {currentPlayer} player</p>
      </div>
      
    </>
  );
          } 
export default App;



