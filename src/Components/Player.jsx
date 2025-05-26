import { AudioPlayer } from "react-audio-play";

export default function Player({ src }) {
  return <AudioPlayer src={src} loop />;
}
