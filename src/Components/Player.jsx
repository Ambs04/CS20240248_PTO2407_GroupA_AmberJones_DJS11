import { AudioPlayer } from "react-audio-play";

export default function Player() {
  return (
    <AudioPlayer
      src="https://www.youtube.com/watch?v=CJ1zVNM24BY"
      loop="true"
    />
  );
}
