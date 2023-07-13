import { FC } from "react";

import Navbar from "../components/navbar/navbar";
import Profile from "../components/profile/profile";

interface IProfilePageProps {}

const ProfilePage: FC<IProfilePageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Profile />
    </>
  );
};

export default ProfilePage;
