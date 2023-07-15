import "./reels.scss";

import { FC, useEffect, useState } from "react";
import { getAccessToken, getReel } from "../../core/requests";

interface IReelProps {}

const Reels: FC<IReelProps> = ({}) => {
  let refreshToken = sessionStorage.getItem("refreshToken");

  let [currentReel, setCurrentReel] = useState<any>(null);

  useEffect(() => {
    if (refreshToken === null) return alert("bruh");

    if (currentReel === null) {
      getAccessToken(refreshToken).then((token) => {
        getReel(token).then((reel) => {
          setCurrentReel(reel);
        });
      });
    }
  });

  return (
    <main className="DHS__Reels">
      <h2>e</h2>
      {currentReel !== null ? (
        <video width="400" controls>
          <source src={currentReel} type="video/webm" />
          Your browser does not support HTML video.
        </video>
      ) : (
        <h1>Bruh</h1>
      )}
    </main>
  );
};

export default Reels;
