export interface Handle {
  id: string;
  username: string;
  price: number;
  type: string;
  sold: boolean;
}

export interface HandlesData {
  handles: Handle[];
}
