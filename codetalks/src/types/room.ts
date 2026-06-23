export type Room = {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
};

export type NewRoom = Omit<Room, 'id'>;

export type RoomRecord = Record<string, NewRoom>;
