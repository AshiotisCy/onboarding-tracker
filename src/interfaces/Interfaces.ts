interface Users {
  id: number;
  address: Address;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
}

interface Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

export type { Users, Todo };
