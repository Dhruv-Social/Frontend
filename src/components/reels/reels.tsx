import "./reels.scss";

// Imports
import { FC, useEffect, useState } from "react";
import { getAccessToken, getReel } from "../../core/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

// Interface for function component
interface IReelProps {}

// Functional Component
const Reels: FC<IReelProps> = ({}) => {
  // Refresh Token
  let refreshToken = sessionStorage.getItem("refreshToken");

  // Sate for the current reel
  let [currentReel, setCurrentReel] = useState<any>(null);

  // UseEffect to get the current Reel
  useEffect(() => {
    if (refreshToken === null) return alert("bruh");

    // Get the current Reel
    if (currentReel === null) {
      getAccessToken(refreshToken).then((token) => {
        getReel(token).then((reel) => {
          setCurrentReel(reel.reelUrl);
        });
      });
    }
    // Empty Depenency array so this only runs once on component mount
  }, []);

  // Return JSX
  return (
    <main className="DHS__Reels">
      {/* CONDITIONAL RENDERING: if the current is null, then we know the reel is   */}
      {currentReel !== null ? (
        <video id="video" autoPlay loop muted controls>
          <source src={currentReel} type="video/webm" />
          Your browser does not support HTML video.
        </video>
      ) : null}
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        <FontAwesomeIcon icon={faRefresh} />
      </button>
    </main>
  );
};

export default Reels;
