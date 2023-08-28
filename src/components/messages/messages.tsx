import "./messages.scss";

import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../core/socket";
import { ICurrentUserOpen } from "./messagesInterface";

import BigMessages from "./bigMessages/bigMessages";
import SmallMessages from "./smallMessages/smallMessages";

interface IMessages {}

const Messages: FC<IMessages> = ({}) => {
  let navigate = useNavigate();

  const [currUserData, setCurrUserData] = useState<ICurrentUserOpen | null>(
    null
  );

  useEffect(() => {
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (refreshToken === null) {
      navigate("/");
    }
  }, []);

  socket.on("getChats", (data) => {
    console.log(JSON.parse(data).length);
  });

  return (
    <main className="DHS__Message">
      <SmallMessages />
      <BigMessages
        currUserData={currUserData}
        setCurrUserData={setCurrUserData}
      />
    </main>
  );
};

export default Messages;
