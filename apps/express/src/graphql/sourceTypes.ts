export type User = {
  id: string;
  email: string;
  username: string;
};

export type Dialog = {
  id: string;
  text: string;
};

export type Event<T> = {
  data: T;
};
