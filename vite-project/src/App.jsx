import React from 'react';
import HLSPlayer from './assets/components/HLSPlayer';

function App() {
  const hlsStreamUrl = 'https://rss01-media-mtx-harmony.apps.equinox.sl/ch-0202001/index.m3u8';  // Example HLS stream URL

  return (
    <div className="App">
      <h1>HLS Streaming with React and HLS.js</h1>
      <HLSPlayer src={hlsStreamUrl} autoPlay={true} controls={true} />
    </div>
  );
}

export default App;
