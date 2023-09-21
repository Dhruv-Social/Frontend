import "./messages.scss";

// Imports
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../core/socket";
import { ICurrentUserOpen } from "./messagesInterface";

// Importing components
import BigMessages from "./bigMessages/bigMessages";
import SmallMessages from "./smallMessages/smallMessages";

// Interface for function component
interface IMessages {}

// Functional Component

const Messages: FC<IMessages> = ({}) => {
  let navigate = useNavigate();

  // State for currentUserDaya
  const [currUserData, setCurrUserData] = useState<ICurrentUserOpen | null>(
    null
  );

  // UseEffect hook called on compoentn mount to check if the refresh token is null, if so we return them to the home page
  useEffect(() => {
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (refreshToken === null) {
      navigate("/");
    }
  }, []);

  // Return JSX
  return (
    <main className="DHS__Message">
      {/* Return other components from parent to make a deeper hirearchy */}
      <SmallMessages />
      <BigMessages
        currUserData={currUserData}
        setCurrUserData={setCurrUserData}
      />
    </main>
  );
};

export default Messages;
