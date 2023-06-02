import React from 'react';
import { useState } from 'react';
import VideoPlayer from './videoplayer';
import './App.css';
import './videoplayer.css'

function App () {
    return (
      <div>
        {Form()}
      </div>
            ); 
          } 
export default App;


export function Form() {
  const [urlInput, setUrl] = useState('');
  return (
    <>
    <h1 className='App-header'> Enter URL of MPEG-DASH or HLS media asset: </h1>
      <label className='App-header'>
        <input
          onChange={e => setUrl(e.target.value)}
          
        />
      </label>
      <div className='App-header'>
      <VideoPlayer source = {urlInput} key= {urlInput}/>
      </div>
      
    </>
  );
}
