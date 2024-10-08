import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSPlayer = ({ src, autoPlay = false, controls = true, width = '100%', height = 'auto' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play();
        }
      });
      
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        if (autoPlay) {
          video.play();
        }
      });
    }
  }, [src, autoPlay]);

  return (
    <video ref={videoRef} controls={controls} width={width} height={height} />
  );
};

export default HLSPlayer;
