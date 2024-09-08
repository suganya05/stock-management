export interface IProduct {
  photoUrl?: string | undefined;
  _id: string;
  name: string;
  actualPrice: number;
  retailPrice: number;
  unit: string;
}

export interface IAllProducts {
  prodList?: Partial<IProduct>[];
  onDelete?: (id: string | undefined) => void;
  onEdit?: (id: string | undefined) => void;
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

export interface ISalesPerson {
  _id?: string;
  name: string;
  email: string;
  photoUrl?: string;
  phoneNumber: string;
  createdBy?: string;
  isActive?: boolean;
}
