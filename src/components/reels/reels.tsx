import "./reels.scss";

import { FC, useEffect, useState } from "react";
import { getAccessToken, getReel } from "../../core/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

interface IReelProps {}

const Reels: FC<IReelProps> = ({}) => {
  let refreshToken = sessionStorage.getItem("refreshToken");

  let [currentReel, setCurrentReel] = useState<any>(null);

  useEffect(() => {
    if (refreshToken === null) return alert("bruh");

    if (currentReel === null) {
      getAccessToken(refreshToken).then((token) => {
        getReel(token).then((reel) => {
          setCurrentReel(reel.reelUrl);
        });
      });
    }
  }, []);

  return (
    <main className="DHS__Reels">
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
