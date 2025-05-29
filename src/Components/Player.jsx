import { AudioPlayer } from "react-audio-play";
import "./player.css";

export default function Player({ src }) {
  return (
    <div className="audio-wrapper">
      <AudioPlayer
        src={src}
        loop
        autoPlay
        hasKeyBindings
        className="player"
        sliderColor="#ffffff"
        backgroundColor="rgb(22, 22, 72)"
        color="#ffffff"
        style={{ borderRadius: "10px", height: "60px" }}
      />
    </div>
  );
}
