import "./smallMessages.scss";

// Imports
import { FC, useEffect, useState } from "react";
import { IChatSmall } from "../messagesInterface";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../core/socket";

// Interface for function component
interface ISmallMessagesProps {}

// Functional Component

const SmallMessages: FC<ISmallMessagesProps> = ({}) => {
  const navigate = useNavigate();

  // State to store the chats that the user is in
  const [chats, setChats] = useState<IChatSmall[] | null>(null);

  // On the chats message, we change the state
  useEffect(() => {
    socket.emit("returnChats");
  }, []);

  socket.on("chats", (chats) => {
    setChats(chats);
  });

  // Return the JSX
  return (
    <div className="DHS__Message__Small">
      {/* CONDITIONAL RENDERING: If the chats are null, then we return "Loading"  */}
      {chats !== null ? (
        // Then we just loop over all the chats and show them to the user
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
