import { Message, MessageRecord } from '../types/message';

export default (data: MessageRecord): Message[] => {
  return Object.keys(data)
    .map(key => {
      return {
        id: key,
        ...data[key],
      };
    })
    .sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });
};
