import "./bigMessages.scss";

import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import {
  getAccessToken,
  getOtherUser,
  getChatMessages,
} from "../../../core/requests";
import { ICurrentUserOpen, IMessage } from "../messagesInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface IBigMessagesProps {
  socket: Socket;
  currUserData: ICurrentUserOpen | null;
  setCurrUserData: (user: ICurrentUserOpen) => void;
}

const BigMessages: FC<IBigMessagesProps> = ({
  socket,
  currUserData,
  setCurrUserData,
}) => {
  // Get the uuid
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<IMessage[] | null>(null);

  let userUUID = searchParams.get("uuid");
  let messageToSend = useRef(null);
  let refreshToken = sessionStorage.getItem("refreshToken");

  const navigate = useNavigate();

  // Check the userUuid
  useEffect(() => {
    if (userUUID === "") {
      navigate("/messages");
    }
  }, []);

  // UseEffect to get the data of a user when the compoenent loads
  useEffect(() => {
    if (refreshToken === null) {
      return navigate("/");
    }

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

  // When they recieve a message
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

  return (
    <div className="DHS__Message__Big">
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
            {messages !== null && messages.length !== 0
              ? messages.map((message) => {
                  return (
                    <div
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
