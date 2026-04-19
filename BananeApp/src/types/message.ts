export type Message = {
  id: string;
  text: string;
  username: string;
  date: string;
  dislike: number;
};

export type NewMessage = Omit<Message, 'id'>;

export type MessageRecord = Record<string, NewMessage>;
