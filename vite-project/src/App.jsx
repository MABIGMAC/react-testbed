import React, { useEffect, useRef } from 'react';
import HLSPlayer from './assets/components/HLSPlayer';
import Hls from 'hls.js';
function App() {
  const hlsStreamUrl = 'https://rss01-media-mtx-harmony.apps.equinox.sl/ch-0202001/index.m3u8';  // Example HLS stream URL
  const audioRef = useRef<HTMLAudioElement>(null)

  function createAudioNode() {
    const audioElement = document.querySelector('audio')
    const audioContext = new AudioContext()
    const audioNode = audioContext.createMediaElementSource(audioElement)
    audioNode.connect(audioContext.destination)
    console.log("Success!");
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsStreamUrl);
      hls.attachMedia(audio);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
          audio.play();
      });
      
      return () => {
        hls.destroy();
      };
    }
  }, [hlsStreamUrl]);
  
  return (
    <div className="App">
      <h1>HLS Streaming with React and HLS.js</h1>
        <HLSPlayer src={hlsStreamUrl} autoPlay={true} controls={true} />
        <button onClick={createAudioNode}>Create audio node</button>
    </div>
  );
}

export default App;
