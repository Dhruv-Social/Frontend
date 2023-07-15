import { FC } from "react";

import Navbar from "../components/navbar/navbar";
import Reels from "../components/reels/reels";

interface IProfilePageProps {}

const ReelsPage: FC<IProfilePageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Reels />
    </>
  );
};

export default ReelsPage;
