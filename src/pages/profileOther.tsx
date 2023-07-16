import { FC } from "react";

import Navbar from "../components/navbar/navbar";
import ProfileOther from "../components/profileOther/profileOther";

interface IProfileOtherPageProps {}

const ProfileOtherPage: FC<IProfileOtherPageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <ProfileOther />
    </>
  );
};

export default ProfileOtherPage;
