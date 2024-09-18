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

export interface IStockItem {
  productId: string;
  quantity: number;
}
export interface IStock {
  _id: string;
  allotedDate: Date;
  stocks: IStockItem[];
}

export interface IGetStockItem {
  productId: IProduct;
  quantity: number;
}

export interface IGetStock {
  _id: string;
  allotedDate: Date;
  stocks: IGetStockItem[];
}

export interface IRepAllocation {
  _id: string;
  salesPersonId: string;
  allotedDate: Date;
  allocatedItems: IGetStockItem[];
  soldItem: IGetStockItem[] | IStockItem[];
}

export interface IAllocate {
  _id?: string;
  allotedDate: Date;
  allocations: Partial<IRepAllocation>[];
}
