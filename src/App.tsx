import { useEffect, useMemo, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
// import audioFile from "./assets/HEYYEYAAEYAAAEYAEYAA.mp3";
import "./App.scss";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(205);
  const [duration, setDuration] = useState(0);

  const audio = useMemo(
    () => new Audio("https://cdn.filestackcontent.com/KLzt2ynvSGRc9JsQ5dwA"),
    []
  );

  useEffect(() => {
    if (currentTime === duration) {
      setIsPlaying(false);
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio, isPlaying, currentTime, duration]);

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newTime = Number(event.target.value);
    setCurrentTime(newTime);

    audio.currentTime = newTime;
    audio.play();
  }

  return (
    <>
      {/* <audio
        controls
        src="https://cdn.filestackcontent.com/KLzt2ynvSGRc9JsQ5dwA"
      /> */}
      <div style={{ width: "400px" }}>
        <div className="audio-player">
          <button
            className="play-pause"
            onClick={() => {
              audio.currentTime = currentTime;
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <input
            type="range"
            value={currentTime}
            min={0}
            max={duration}
            onChange={handleSliderChange}
          />
          <div className="duration">
            <p>{formatTime(currentTime)}</p>
            <p>-</p>
            <p>{formatTime(duration)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
