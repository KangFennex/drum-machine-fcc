import "./App.scss";
import { useState } from "react";
import { GiMusicalNotes } from "react-icons/gi";
import { AiOutlinePoweroff } from "react-icons/ai";
import { sounds } from "./config";

function App() {
  const [soundBite, setSoundBite] = useState("");
  const [isOff, setIsOff] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  const handleShowDisplay = (title) => {
    setSoundBite(title);
  };

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.volume = volume / 100;
    audio.play();
  };

  const handleDrumPadClick = (source) => {
    playSound(source);
  };

  const handleIsOff = () => {
    setIsOff(!isOff);
    document.getElementById("display").innerHTML = "";
  };

  const handleVolumeDragStart = () => {
    setIsDraggingVolume(true);
  };

  const handleVolumeDrag = (event) => {
    if (isDraggingVolume) {
      const volumePosition =
        event.clientX - event.target.getBoundingClientRect().left;
      const newVolume = Math.min(
        Math.max(
          Math.round((volumePosition / event.target.offsetWidth) * 100),
          0
        ),
        100
      );
      setVolume(newVolume);
      setSoundBite(`Volume: ${newVolume}`);
    }
  };

  const handleVolumeDragEnd = () => {
    setIsDraggingVolume(false);
  };

  const handleVolumeChange = (event) => {
    const newVolume = Math.min(Math.max(parseInt(event.target.value), 0), 100);
    setVolume(newVolume);
    setSoundBite(`Volume: ${newVolume}`);
  };

  return (
    <div className="App">
      <div className="dm-container">
        <div id="drum-machine" className="dm-container__dm">
          <GiMusicalNotes size={40} className="dm-container__dm__music-icon" />
          <div id="display" className="dm-container__dm__display">
            {soundBite}
          </div>
          <div className="dm-container__dm__drum-pads">
            {sounds.map((sound) => (
              <div
                key={sound.title}
                id="drum-pad"
                className="dm-container__dm__drum-pads__drum-pad"
                onClick={() => {
                  if (!isOff) {
                    handleDrumPadClick(sound.source);
                    handleShowDisplay(sound.title);
                  }
                }}
              >
                {sound.id}
              </div>
            ))}
          </div>
          <div className="dm-container__dm__control-pad">
            <AiOutlinePoweroff
              size={35}
              className="dm-container__dm__control-pad__turn-off-icon"
              style={{ color: isOff ? "#e74c3c" : "black" }}
              onClick={handleIsOff}
            />
            <div className="dm-container__dm__control-pad__volume">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={isOff ? null : handleVolumeChange}
                onMouseDown={isOff ? null : handleVolumeDragStart}
                onMouseMove={isOff ? null : handleVolumeDrag}
                onMouseUp={isOff ? null : handleVolumeDragEnd}
                onMouseLeave={isOff ? null : handleVolumeDragEnd}
                className="dm-container__dm__control-pad__volume__volume-slider"
              />
            </div>
          </div>

          <h2>
            Coded by <a href="https://github.com/KangFennex">Kangkm</a>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
