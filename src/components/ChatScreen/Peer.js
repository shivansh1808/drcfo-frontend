import { useRef, useEffect } from "react";
import {
  useHMSStore,
  useHMSActions,
  selectPeers,
  selectCameraStreamByPeerID,
} from "@100mslive/react-sdk";
import "./Conference.css";
function Peer({ peer }) {
  console.log(peer);
  // const { videoRef } = useVideo({
  //   trackId: peer.videoTrack,
  // });
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  // get the camera track to render
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);
  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <h1 className={`peer-name ${peer.isLocal ? "abs" : ""}`}>
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </h1>
    </div>
  );
}

export default Peer;
