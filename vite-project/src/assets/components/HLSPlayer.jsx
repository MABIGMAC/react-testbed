import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSPlayer = ({ src, autoPlay = false, controls = true, width = '100%', height = 'auto' }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(audio);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          audio.play();
        }
      });
      
      return () => {
        hls.destroy();
      };
    }
  }, [src, autoPlay]);

  return (
    <audio ref={audioRef} controls={controls} width={width} height={height} />
  );
};

export default HLSPlayer;
