import ReactPlayer from "react-player";
import { useState, useRef, useEffect } from "react";
import screenfull from "screenfull";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Replay5Icon from "@mui/icons-material/Replay5";
import Forward5Icon from "@mui/icons-material/Forward5";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import SpeedIcon from "@mui/icons-material/Speed";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import styled from "styled-components";

function VideoPlayer({ video, setProgress }) {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [volumeMenuOpen, setVolumeMenuOpen] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [isPause, setPause] = useState(true)

  useEffect(() => {
    document.documentElement.style.setProperty("--value", `${played * 100}%`);
  }, [played]);

  const handlePlayPause = () => {
    if (videoEnded) {
      setVideoEnded(false); // Đặt lại trạng thái khi bắt đầu chơi lại video
    }
    setPlaying(!playing);
    setPause(!isPause)
    if (!isPause)
    {
      setProgress((prevProgress) => ({
        ...prevProgress,
        percent: (playerRef.current.getCurrentTime() * 100 / duration).toFixed(1)
      }))
    }
  }

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    setSpeedMenuOpen(false);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    screenfull.toggle(playerRef.current.wrapper);
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  const handleEnded = () => {
    setVideoEnded(true);
    handlePlayPause()
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds();
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mm}:${ss.toString().padStart(2, "0")}`;
  };

  return (
    <VideoPlayerWrapper
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
    >
      <ReactPlayer
        ref={playerRef}
        className="react-player"
        url={video}
        playing={playing}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={(duration) => setDuration(duration)}
        onEnded={handleEnded}
        controls={false}
        width="100%"
        height="100%"
      />
      <div className={`controls ${controlsVisible ? "visible" : ""}`}>
        <div className="controls-right">
          <button id="main" onClick={handlePlayPause} title="Play/Pause">
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </button>
          <button onClick={handleRewind} title="Rewind 5s">
            <Replay5Icon />
          </button>
          <button onClick={handleFastForward} title="Forward 5s">
            <Forward5Icon></Forward5Icon>
          </button>
          <div className="speed-control">
            <button
              onClick={() => setSpeedMenuOpen(!speedMenuOpen)}
              title="Change Speed"
            >
              <SpeedIcon />
            </button>
            {speedMenuOpen && (
              <div className="speed-menu">
                <button onClick={() => handleSpeedChange(0.5)}>0.5x</button>
                <button onClick={() => handleSpeedChange(1)}>1x</button>
                <button onClick={() => handleSpeedChange(1.5)}>1.5x</button>
                <button onClick={() => handleSpeedChange(2)}>2x</button>
              </div>
            )}
          </div>
        </div>
        <div className="controls-center">
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeekChange}
            className="seek-bar"
            title="Seek"
          />
          <div className="controls-center-time">
            {formatTime(played * duration)} / {formatTime(duration)}
          </div>
        </div>
        <div className="controls-left">
          <div className="volume-control">
            <button
              onClick={() => setVolumeMenuOpen(!volumeMenuOpen)}
              title="Volume Control"
            >
              <VolumeUpIcon />
            </button>
            {volumeMenuOpen && (
              <div className="volume-menu">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-bar"
                />
                <button
                  onClick={() => setMuted(!muted)}
                  title={muted ? "Unmute" : "Mute"}
                >
                  {muted ? "Unmute" : "Mute"}
                </button>
              </div>
            )}
          </div>
          <button onClick={handleFullscreen} title="Fullscreen">
            <FullscreenIcon />
          </button>
        </div>
      </div>
      {videoEnded && (
        <div className="video-ended-message">
          <p>Video ended. </p>
          <button onClick={() => setVideoEnded(false)}>Replay</button>
        </div>
      )}
    </VideoPlayerWrapper>
  );
}

const VideoPlayerWrapper = styled.div`
  background-color: #2d2f31;
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }

  .controls {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  .controls.visible {
    opacity: 1;
  }
  .controls-right,
  .controls-left {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .controls-center {
    display: flex;
    gap: 20px;
    align-items: center;
    flex-grow: 1;
    .controls-center-time {
      color: white;
      min-width: 60px;
    }
  }

  .controls button,
  .controls input {
    background: rgba(0, 0, 0, 0.7);
    border: none;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }

  .controls input[type="range"].seek-bar {
    -webkit-appearance: none; /* Loại bỏ giao diện mặc định của trình duyệt */
    width: 100%; /* Chiều rộng của thanh trượt */
    height: 8px; /* Chiều cao của thanh trượt */
    background: linear-gradient(
      to right,
      #2196f3 0%,
      #2196f3 var(--value),
      #ddd var(--value),
      #ddd 100%
    ); /* Gradient cho thanh trượt */
    outline: none;
    border-radius: 5px;
    padding: 0;
    margin: 0;
  }

  .controls input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px; /* Chiều rộng của nút trượt */
    height: 16px; /* Chiều cao của nút trượt */
    background: #1971c2; /* Màu của nút trượt */
    cursor: pointer;
    border-radius: 50%;
    margin-top: -3px; /* Để nút trượt căn giữa với thanh trượt */
  }

  .controls input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #000;
    cursor: pointer;
    border-radius: 50%;
  }

  .controls div {
    color: white;
  }

  .speed-control,
  .volume-control {
    position: relative;
  }

  .speed-menu,
  .volume-menu {
    position: absolute;
    bottom: 30px; /* Đổi từ top: 30px sang bottom: 30px để menu đổ phía trên */
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .speed-menu button,
  .volume-menu button,
  .volume-menu input {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px 0px !important;
    text-align: left;
  }

  .speed-menu button:hover,
  .volume-menu button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .video-ended-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }

  .video-ended-message p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .video-ended-message button {
    background: #1971c2;
    border: none;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    .controls {
      gap: 3px;
      .controls-right {
        button:not(#main) {
          display: none;
        }
      }
    }
  }
`;

export default VideoPlayer;
