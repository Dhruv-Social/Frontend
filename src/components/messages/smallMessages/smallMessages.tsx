import "./smallMessages.scss";

import { FC, useState } from "react";
import { IChatSmall } from "../messagesInterface";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../core/socket";

interface ISmallMessagesProps {}

const SmallMessages: FC<ISmallMessagesProps> = ({}) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<IChatSmall[] | null>(null);

  socket.on("chats", (chats) => {
    setChats(chats);
  });

  return (
    <div className="DHS__Message__Small">
      {chats !== null ? (
        chats.map((chat) => {
          return (
            <div
              key={crypto.randomUUID()}
              className="DHS__Message__Small__Chat"
              onClick={() => {
                navigate({
                  pathname: "/messages",
                  search: `?uuid=${chat.userUuid}`,
                });
              }}
            >
              <div
                className="DHS__Message__Small__Chat__ProfilePicture"
                style={{
                  backgroundImage: `url("${"data:image/jpeg;base64,"}${
                    chat.profilePicture
                  }")`,
                }}
              ></div>
              <h2>{chat.displayName}</h2>
            </div>
          );
        })
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};

export default SmallMessages;
