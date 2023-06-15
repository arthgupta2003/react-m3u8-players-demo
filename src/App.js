import React from 'react';
import { useState } from 'react';
import { Helmet } from "react-helmet";
import './App.css';
import { TextField } from '@material-ui/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import "video.js/dist/video-js.css";
import { useVideoJS } from "react-hook-videojs";
import ReactHlsPlayer from 'react-hls-player';
import MediaElement from './MediaElement';
import ClapprComponent from './ClapprComponent';
import SimpleShaka from './SimpleShaka';
import PlyrPlayer from './PlyrPlayer';
import DPlayer from "react-dplayer";


function App() {
  const [urlInput, setUrl] = useState('');
  const [currentPlayer, setPlayer] = useState('hlsJS');
  const [anchorEl, setAnchorEl] = useState(null);
  const { Video, player, ready } = useVideoJS(
    { sources: [{ src: urlInput, type: 'application/x-mpegURL' }] }
  );

  const handlePlayerSelect = (event) => {
    setPlayer(event.target.value);
  };
  const VideoJSPlayer = Video;
  const sources = [{ src: urlInput, type: 'application/x-mpegURL' }], config = {}, tracks = {}
  var allPlayerDict = {
    "videoJS": <VideoJSPlayer controls autoPlay height='500' volume='1' muted key={urlInput} />,
    "hlsJS": <ReactHlsPlayer src={urlInput} autoPlay={true} controls={true} width='100%' key={urlInput} />,
    "mediaElement": <MediaElement
      id="player1"
      mediaType="video"
      preload="none"
      controls
      width="640"
      height="360"
      poster=""
      sources={JSON.stringify(sources)}
      options={JSON.stringify(config)}
      tracks={JSON.stringify(tracks)}
      key={urlInput}
    />,
    "clappr": <ClapprComponent source={urlInput} key={urlInput} />,
    'shaka': <SimpleShaka src={urlInput} key={urlInput}></SimpleShaka>,
    'plyr': <PlyrPlayer src={urlInput} key={urlInput}></PlyrPlayer>,
    'dplayer': <DPlayer options={{ video: { url: urlInput, height: "100px" } }} />,
    '': <></>
  };
  return (
    <div>
      <Helmet>
        <script src="https://cdn.rawgit.com/video-dev/hls.js/18bb552/dist/hls.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mux.js/5.10.0/mux.min.js"></script>
      </Helmet>
      <div className="header">
        <h2>Test your HLS VODs and Livestreams with VideoJS, hlsJS, MediaElement, Clappr</h2>
      </div>
      <p align="center">
        <Box sx={{ display: 'inline-flex', width: "80%", color: 'white', bgcolor: '#C2267E', height: '45px' }}>
          <FormControl sx={{ 'width': "15%" }} >
            <Select
              labelId="select-label"
              value={currentPlayer}
              label="Player"
              onChange={handlePlayerSelect}
              sx={{ "color": "white", "fontWeight": "bold", 'border': '0', 'boxShadow': 'none' }}

            >
              <MenuItem value={'hlsJS'}> Using hlsJS</MenuItem>
              <MenuItem value={'videoJS'}> Using videoJS</MenuItem>
              <MenuItem value={'mediaElement'}>Using mediaElement</MenuItem>
              <MenuItem value={'clappr'}>Using clappr</MenuItem>
              <MenuItem value={'shaka'}>Using shaka</MenuItem>
              <MenuItem value={'plyr'}>Using plyr</MenuItem>
              <MenuItem value={'dplayer'}>Using dplayer</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="filled"
            size="small"
            onChange={(e) => setUrl(e.target.value)}
            style={{ backgroundColor: 'white', width: '70%', height: "45px" }}
            label='Enter URL of m3u8 file'
          />
          <Button
            onClick={() => {
              const tempURL = urlInput;
              const tempPlayer = currentPlayer;

              setPlayer('');
              setUrl('');

              setTimeout(() => {
                setPlayer(tempPlayer);
                setUrl(tempURL);
                console.log('Refresh');
              }, 100); // Delay of 100 milliseconds to force update
            }}
            sx={{ 'width': '15%', "color": "white", "fontWeight": "bold", 'border': '0', 'boxShadow': 'none' }}>
            Refresh Stream
          </Button>
        </Box>
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="VideoContainer" style={{ width: '50%', height: 'auto' }}>
          {urlInput !== "" && allPlayerDict[currentPlayer]}
        </div>
      </div>

    </div>
  );
}
export default App;



