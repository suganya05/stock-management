export interface IProduct {
  photoUrl?: string;
  name: string;
  actualPrice: number;
  retailPrice: number;
  _id: string;
  unit: string;
}

export interface IAllProducts {
  prodList?: IProduct[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export interface AddNewProductForm {
  name: string;
  unitOfMesurment: string;
  wholesalePrice: string;
  retailPrice: string;
  imgUrl?: string;
}

export interface IOutlet {
  _id?: string;
  outletName: string;
  address: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  photoUrl?: string;
  customPricingId?: string;
  qrcode?: string;
}
