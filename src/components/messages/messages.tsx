import "./messages.scss";

import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

interface IMessages {}

const Messages: FC<IMessages> = ({}) => {
  let navigate = useNavigate();
  let sendToClient = useRef(null);
  const [sendTo, setSendTo] = useState<string>("");

  useEffect(() => {
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (refreshToken === null) {
      navigate("/");
    }
  });

  const socket = io("http://localhost:3000", {
    auth: {
      token: sessionStorage.getItem("refreshToken"),
    },
  });

  socket.on("sent", (message) => {
    const messages = document.getElementById("messages");

    const Message = document.createElement("p");

    Message.innerText = message;
    messages!.appendChild(Message);
  });

  socket.on("privateMessage", (message) => {
    console.log(message);

    const messages = document.getElementById("messages");

    const Message = document.createElement("p");

    Message.innerText = `${message.from}: ${message.message}`;
    messages!.appendChild(Message);
  });

  return (
    <main className="DHS__Message">
      <input type="text" ref={sendToClient} />
      <button
        onClick={() => {
          socket.emit("message", {
            to: sendTo,
            message: (sendToClient.current! as any).value,
          });

          const messages = document.getElementById("messages");

          const message = document.createElement("p");

          message.innerText = `You said: ${
            (sendToClient.current! as any).value
          }`;
          messages!.appendChild(message);
        }}
      >
        Send
      </button>

      <button
        onClick={() => {
          setSendTo("siddharthS");
        }}
      >
        Siddahrth
      </button>

      <button
        onClick={() => {
          setSendTo("siddharthS");
        }}
      >
        Siddhesh
      </button>

      <div id="messages"></div>
    </main>
  );
};

export default Messages;
