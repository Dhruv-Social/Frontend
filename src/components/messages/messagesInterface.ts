export interface ICurrentUserOpen {
  uuid: String;
  profilePicture: String;
  displayName: String;
}

export interface IChatSmall {
  chatUuid: String;
  userUuid: String;
  profilePicture: String;
  displayName: String;
}

export interface IMessage {
  author: string;
  chat_relation: string;
  creatiom_time: string;
  message: string;
  message_uuid: string;
  to: string;
}
