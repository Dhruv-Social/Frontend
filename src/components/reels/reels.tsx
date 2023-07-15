import "./reels.scss";

import { FC, useEffect } from "react";

interface IReelProps {}

const Reels: FC<IReelProps> = ({}) => {
  let refreshToken = sessionStorage.getItem("refreshToken");

  useEffect(() => {
    if (refreshToken === null) return alert("bruh");
  });

  return <main className="DHS__Reels"></main>;
};

export default Reels;
