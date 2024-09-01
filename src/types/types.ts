export interface IProduct {
  photoUrl: string;
  name: string;
  actualPrice: number;
  retailPrice: number;
  _id: string;
}

export interface IAllProducts {
  prodList?: IProduct[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}
