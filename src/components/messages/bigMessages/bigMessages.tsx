import "./bigMessages.scss";

// Imports
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../../../core/socket";
import {
  getAccessToken,
  getOtherUser,
  getChatMessages,
} from "../../../core/requests";
import { ICurrentUserOpen, IMessage } from "../messagesInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// Interface for function component
interface IBigMessagesProps {
  currUserData: ICurrentUserOpen | null;
  setCurrUserData: (user: ICurrentUserOpen) => void;
}

// Functional Component
const BigMessages: FC<IBigMessagesProps> = ({
  currUserData,
  setCurrUserData,
}) => {
  // get the search params and queries
  const [searchParams] = useSearchParams();

  // State for the current messages between user1 and user2
  const [messages, setMessages] = useState<IMessage[] | null>(null);

  // Get the user uuid from the url
  let userUUID = searchParams.get("uuid");
  // Ref to the input for the current message
  let messageToSend = useRef(null);

  // Get the refresh toekn
  let refreshToken = sessionStorage.getItem("refreshToken");

  const navigate = useNavigate();

  // UseEffect to CHECK THE CURRENT USER
  useEffect(() => {
    // If the user UUID is empty, then we return them to the messages endpoint
    if (userUUID === "") {
      navigate("/messages");
    }
  }, []);

  // UseEffect to get the data of a user when the compoenent loads
  useEffect(() => {
    if (refreshToken === null) {
      return navigate("/");
    }

    // Get token
    getAccessToken(refreshToken).then((token) => {
      if (userUUID === null) return;

      getOtherUser(token, userUUID).then((userData) => {
        if (userData.success === false) {
          return alert("An error has occoured while fetching user data");
        }

        setCurrUserData({
          uuid: userData.uuid,
          profilePicture: userData.profilePicture,
          displayName: userData.display_name,
        });

        // get messages for chat
        getChatMessages(token, userData.uuid).then((data) => {
          if (data.success === false) {
            return;
          }

          setMessages(data);
        });
      });
    });
  }, [userUUID]);

  // if the user gets a message (socket event), then we append it to the the current messages
  socket.on("privateMessage", (data) => {
    if (currUserData === null) return;

    if (data.from === currUserData.uuid) {
      const messages = document.getElementsByClassName(
        "DHS__Message__Big__Messages"
      );

      const message = document.createElement("div");
      message.className = "DHS__Message__Big__Messages__Received";

      message.innerText = data.message;

      messages[0].appendChild(message);
    }
  });

  // Return JSX
  return (
    <div className="DHS__Message__Big">
      {/* CONDITIONAL RENDERING: If the user data is null, then we return "Nothing going on here"*/}
      {currUserData !== null ? (
        <>
          <div className="DHS__Message__Big__Top">
            <div
              className="DHS__Message__Big__Top__ProfilePicture"
              style={{
                backgroundImage: `url("${"data:image/jpeg;base64,"}${
                  currUserData.profilePicture
                }")`,
              }}
            ></div>
            <h2>{currUserData.displayName}</h2>
          </div>
          <div className="DHS__Message__Big__Messages">
            {/* If the messages are null, or have a length of 0, we return null as we have no messages to show */}
            {messages !== null && messages.length !== 0
              ? // here we are now looping over all the messages and showing them 1 by 1 the the user, then results in a time complexity of O(n) or Linear
                messages.map((message) => {
                  return (
                    <div
                      key={crypto.randomUUID()}
                      className={
                        currUserData.uuid === message.to
                          ? "DHS__Message__Big__Messages__Sent"
                          : "DHS__Message__Big__Messages__Received"
                      }
                    >
                      {message.message}
                    </div>
                  );
                })
              : null}
          </div>
          <form
            className="DHS__Message__Big__SendMessage"
            onSubmit={(e) => {
              // On submit, we send an event to the server and show the message to the sender
              e.preventDefault();

              socket.emit("message", {
                to: userUUID,
                message: (messageToSend.current! as any).value,
              });

              const messages = document.getElementsByClassName(
                "DHS__Message__Big__Messages"
              );

              const message = document.createElement("div");
              message.className = "DHS__Message__Big__Messages__Sent";

              message.innerText = (messageToSend.current! as any).value;
              messages[0].appendChild(message);
              (messageToSend.current! as any).value = "";
            }}
          >
            <input type="text" ref={messageToSend} />

            <button type="submit">
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </form>
        </>
      ) : (
        <h2>Nothing going on here...</h2>
      )}
    </div>
  );
};

export default BigMessages;
