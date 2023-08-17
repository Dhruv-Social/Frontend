import { FC } from "react";

import Navbar from "../components/navbar/navbar";
import Messages from "../components/messages/messages";

interface IMessagesPageProps {}

const MessagesPage: FC<IMessagesPageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Messages />
    </>
  );
};

export default MessagesPage;
