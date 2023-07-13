import "./profile.scss";

import { FC, useEffect } from "react";

interface IProfileProps {}

const Profile: FC<IProfileProps> = ({}) => {
  return (
    <main className="DHS__Profile">
      <_ProfileTop
        profilePicture={sessionStorage.getItem("profilePicture") ?? "e"}
        banner={sessionStorage.getItem("banner") ?? "e"}
      />
    </main>
  );
};

interface _IProfileTopProps {
  profilePicture: string;
  banner: string;
}

const _ProfileTop: FC<_IProfileTopProps> = ({ profilePicture, banner }) => {
  return (
    <div className="DHS__Profile__Top">
      <div className="DHS__Profile__Top__Images">
        <div
          className="DHS__Profile__Top__Images__Banner"
          style={{
            backgroundImage: `url("${"data:image/jpeg;base64,"}${banner}")`,
          }}
        ></div>
        <div
          className="DHS__Profile__Top__Images__ProfilePicture"
          style={{
            backgroundImage: `url("${"data:image/jpeg;base64,"}${profilePicture}")`,
          }}
        ></div>
      </div>
    </div>
  );
};

interface _IProfileBottonProps {}

const _ProfileBotton: FC<_IProfileBottonProps> = ({}) => {
  return <div className="DHS__Profile__Bottom"></div>;
};

export default Profile;
