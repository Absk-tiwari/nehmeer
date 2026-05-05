import React, { useState } from "react";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faExpand, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

const VideoPlayer = ({
  url,
  thumbnail,
  title,
  width = "100%",
  height = "100%",
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  light = true,
  onEnded,
  onPlay,
  onPause,
}) => {
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(muted ? 0 : 0.8);
  const [isMuted, setIsMuted] = useState(muted);

  const handlePlayPause = () => {
    setPlaying(!playing);
    if (!playing && onPlay) onPlay();
    if (playing && onPause) onPause();
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 0.8 : 0);
  };

  const handleEnded = () => {
    setPlaying(false);
    if (onEnded) onEnded();
  };

  return (
    <div className="video-player-wrapper">
      <ReactPlayer
        url={url}
        width={width}
        height={height}
        playing={playing}
        loop={loop}
        volume={volume}
        muted={isMuted}
        controls={controls}
        light={light ? thumbnail || true : false}
        onEnded={handleEnded}
        onPlay={() => {
          setPlaying(true);
          if (onPlay) onPlay();
        }}
        onPause={() => {
          setPlaying(false);
          if (onPause) onPause();
        }}
        playIcon={
          <div className="custom-play-button">
            <FontAwesomeIcon icon={faPlay} />
          </div>
        }
        config={{
          youtube: {
            playerVars: {
              showinfo: 1,
              modestbranding: 1,
            },
          },
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />

      {title && <div className="video-title">{title}</div>}

      {!controls && (
        <div className="custom-controls">
          <button className="control-btn" onClick={handlePlayPause}>
            <FontAwesomeIcon icon={playing ? faPause : faPlay} />
          </button>
          <button className="control-btn" onClick={handleVolumeToggle}>
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
