export type Message = {
  id: string;
  username: string;
  text: string;
  createdAt: string;
};

export type NewMessage = Omit<Message, 'id'>;

export type MessageRecord = Record<string, NewMessage>;
